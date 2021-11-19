const MY_KEY = '23530022-92f1b2e37220c2d922c4e208a';

export default function ImageApi(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    return new Error('Упс,что-то пошло не так =(');
  });
}
