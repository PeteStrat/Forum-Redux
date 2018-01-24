export default function generateId () {
  let id = '';
  let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < Math.floor(Math.random() * 10) + 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}
