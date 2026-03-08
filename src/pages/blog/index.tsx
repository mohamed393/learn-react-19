import {posts} from "../../data/posts.ts";
import {Link} from "react-router";

export default function Blog(){
    return(<div>
        <h1>Blog</h1>
        <ul>
            {posts.map((post)=>(
                <li key={post.id}>
                    <Link to={`/blog/${post.id}?showDate=true`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    </div>)
}