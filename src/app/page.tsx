import {cookieBasedClient, isAuthenticated} from "@/utils/amplify-utils";
import Post from "@/components/Post";
import {onDeletePost} from "@/app/_actions/actions";


export default async function Home() {
  const isSignedIn = await isAuthenticated();
  const {data: posts} = await cookieBasedClient.models.Post.list({
    selectionSet: ['title', 'id'],
    authMode: isSignedIn ? "userPool": 'identityPool'
  })

  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10">List of all titles</h1>

      {posts?.map((post, idx) => (
        <Post
          idx={idx}
          onDelete={onDeletePost}
          post={post}
          key={idx}
          isSignedIn={isSignedIn}
        />
      ))}
    </main>
  );
}
