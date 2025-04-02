export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number;
}

export interface PostsResponse {
  posts: Post[];
  limit: number;
  skip: number;
  total: number;
}

export async function getPosts(limit : number, skip : number): Promise<PostsResponse> {
    try{
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);

      if(!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }
    catch(error) {
      console.error(error);
      throw new Error("Could not fetch posts!");
    }

}

export async function getPost(postId: Post['id']): Promise<Post> {
  try{
    const response = await fetch(`https://dummyjson.com/posts/${postId}`);

    if(!response.ok){
      throw new Error(`Post ID = ${postId} - Error = ${response.statusText}`);
    }

    return response.json();
  }
  catch(error){
    console.error(error);
    throw new Error(`Could not fetch post with ID ${postId}`);
  }
}
