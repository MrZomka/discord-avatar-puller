/*
 * This file is part of discord-avatar-puller, which is licensed under
 * the GNU Affero General Public License version 3.
 *
 * discord-avatar-puller is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * discord-avatar-puller is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with discord-avatar-puller.  If not, see <https://www.gnu.org/licenses/>.
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname.split('/');
    const userId = path[1];
  
    if (!userId) {
      return new Response('User ID must be provided.', { status: 400 });
    }
  
    const discordUrl = `https://discord.com/api/users/${userId}`;
  
    try {
      const discordResponse = await fetch(discordUrl, {
        headers: {
          Authorization: `Bot ${botToken}`
        }
      });
  
      if (!discordResponse.ok) {
        throw new Error('Failed to fetch user data from Discord');
      }
  
      const data = await discordResponse.json();
  
      if (data.avatar) {
        const avatarHash = data.avatar;
        const isAnimated = avatarHash.startsWith('a_');
        const format = isAnimated ? 'gif' : 'png';
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${format}?size=256`;
        return Response.redirect(avatarUrl, 302);
      } else {
        return new Response('Avatar not found', { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching user avatar:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  