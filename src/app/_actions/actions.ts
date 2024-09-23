'use server'

import {cookieBasedClient} from "@/utils/amplify-utils";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {Schema} from "../../../amplify/data/resource";

export async function deleteComment(fromData: FormData) {
  const id = fromData.get('id')?.toString();
  if(!id) return;
  const {data, errors} = await cookieBasedClient.models.Comment.delete({
    id
  })

  console.log('comment delete', data, errors)
}

export async function addComment(
  content: string,
  post: Schema["Post"]["type"],
  paramsId: string
) {
  console.log(content, post, paramsId);
  if(content.trim().length === 0) return;
  const {data, errors} = await cookieBasedClient.models.Comment.create({
    postId: post.id,
    content
  })

  console.log('got comment', data, errors)
  revalidatePath(`/post/${paramsId}`)
}

export async function onDeletePost(id: string) {
  const { data: commentsData, errors: commentErrors } = await cookieBasedClient.models.Comment.list({
    filter: { postId: { eq: id } }
  });

  if (commentErrors) {
    console.error('Error fetching comments:', commentErrors);
    return;
  }

  console.log(commentsData)

  if (commentsData) {
    for (const comment of commentsData) {
      const { errors } = await cookieBasedClient.models.Comment.delete({
        id: comment.id,
      });
      if (errors) {
        console.error('Error deleting comment:', errors);
      } else {
        console.log('Deleted comment:', comment.id);
      }
    }
  }

  // Now delete the post itself
  const { errors: postErrors } = await cookieBasedClient.models.Post.delete({
    id,
  });

  if (postErrors) {
    console.error('Error deleting post:', postErrors);
  } else {
    console.log('Deleted post:', id);
  }

  revalidatePath('/');
}

export async function createPost(formData: FormData) {
  const { data } = await cookieBasedClient.models.Post.create({
    title: formData.get('title')?.toString() || '',
  })
  console.log('create post', data)
  redirect('/')
}