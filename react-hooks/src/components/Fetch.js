import useFetch from "../hooks/useFetch";


function Fetch(){
    const {data,loading,error} = useFetch('https://jsonplaceholder.typicode.com/posts/1');

    return(
        <div>
            <h2>useFetch</h2>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <p>{data?.title}</p>}
        </div>
    );
}

export default Fetch;