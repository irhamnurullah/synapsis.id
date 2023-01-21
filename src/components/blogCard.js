import React from 'react';

export default function BlogCard({
  title,
  body,
  users,
  post,
  comments,
  user,
  comment,
}) {
  const totalComments = comments?.filter(
    (comment) => comment.post_id === post?.id
  );

  return (
    <article className="bg-white max-w-md rounded-[6px] shadow-md hover:scale-105 transition duration-200">
      <div className="border-b">
        <div className="p-5">
          {user && (
            <>
              <p className="text-sm text-gray-800 font-semibold">{user.name}</p>
              <p className="text-xs text-gray-600 font-medium">{user.email}</p>
            </>
          )}

          {users
            ?.filter((user) => user.id === post?.user_id)
            .map((newUser, index) => (
              <div key={index}>
                <p className="text-sm text-gray-800 font-semibold">
                  {newUser.name}
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  {newUser.email}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg leading-5  text-gray-800">
            {title}
          </h2>
          <p className="text-sm leading-5 text-gray-600">{body}</p>
        </div>
      </div>

      {totalComments?.length > 0 && (
        <div className="border-t">
          <div className="p-5">
            <p className="text-xs text-gray-800 font-medium">
              Comments :
              <span className="font-bold"> {totalComments.length}</span>
            </p>
          </div>
        </div>
      )}
      {comment && (
        <div className="border-t">
          <div className="p-5">
            <p className="text-xs text-gray-800 font-medium">
              Comments :<span className="font-bold"> {comment?.length}</span>
            </p>
            {comment?.length >= 1 && (
              <div className="flex flex-col text-right mt-2 space-y-2 ">
                {comment.map((comment, index) => (
                  <div key={index} className="px-4 py-1 rounded-lg bg-gray-100">
                    <p className="text-sm text-gray-800 font-semibold">
                      {comment.body}
                    </p>
                    <p className="text-xs text-gray-800 font-medium">
                      {comment.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
