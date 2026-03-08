import {useParams, useSearchParams} from "react-router";
import {getPostById} from "../../data/posts.ts";

export default function Post(){
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const showDate=searchParams.get("showDate");
    const post =getPostById(id?+id:0);

    return(<div>
        <p>{post.id}</p>
        <p> {post.title} </p>
        <p>{post.content}</p>
        {showDate &&<p>{post?.createdAt.toLocaleDateString()}</p>}
    </div>)
}