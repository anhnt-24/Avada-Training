const BASE_URL="https://jsonplaceholder.typicode.com/"

const [users,posts,comments] = await Promise.all([
    fetch(`${BASE_URL}/users`).then(res => res.json()),
    fetch(`${BASE_URL}/posts`).then(res => res.json()),
    fetch(`${BASE_URL}/comments`).then(res => res.json()),
])

// 3. Get all the posts and comments from the API. Map the data with the users array
const commentWithUserID=comments.map(comment=>({...comment,userId:posts[posts.findIndex(post => post.id === comment.postId)].userId}))
const usersWithPostsAndComments=users.map(user => {
    return {
        ...user,
        comments:commentWithUserID.filter(comment => comment.userId === user.id).map(comment=>{
            const{userId,...res}=comment
            return res}),
        posts: posts.filter(post=>post.userId === user.id).map(post=>{
        const {userId,...res}=post
            return res
        })
    }
})

// 4. Filter only users with more than 3 comments.
const usersWithMoreThan3Comments=usersWithPostsAndComments.filter(user=>user.comments.length>3)

// 5. Reformat the data with the count of comments and posts
const userWithPostsAndCommentsCount=usersWithPostsAndComments.map(user=>{
    const {comments,posts,...res}=user
    return {...res,commentsCount:comments.length,postsCount:posts.length}
})

// 6. Who is the user with the most comments/posts?
const userWithMostComments=userWithPostsAndCommentsCount.reduce((max,user)=>user.commentsCount>max.commentsCount? user: max)
const userWithMostPosts=userWithPostsAndCommentsCount.reduce((max,user)=>user.postsCount>max.postsCount? user: max)

// 7.Sort the list of users by the postsCount value descending?
const userWithDescPostCount=userWithPostsAndCommentsCount.sort((a,b)=>b.postsCount-a.postsCount)

// 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
const postId=1
const [post, commentsByPost1] = await Promise.all([
    fetch(`${BASE_URL}/posts/${postId}`).then(res => res.json()),
    fetch(`${BASE_URL}/comments?postId=${postId}`).then(res => res.json()),
]);

const postWithComments={...post,comments:commentsByPost1};

console.log(postWithComments)