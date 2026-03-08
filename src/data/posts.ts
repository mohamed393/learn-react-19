const posts =[
    {id:1,title:'Post 1',content:'this is the first post',createdAt:new Date()},
    {id:2,title:'Post 2',content:'this is the second post',createdAt:new Date()},
    {id:3,title:'Post 3',content:'this is the third post',createdAt:new Date()},
]
type PostDetails={id:number,title:string,content:string,createdAt:Date};
const getPostById = (id: number):PostDetails => {
    return posts.filter(el=>el.id == id)[0]
}
export { posts,getPostById }
