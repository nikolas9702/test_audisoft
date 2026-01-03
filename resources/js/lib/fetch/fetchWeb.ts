



export default function fetchActionWeb({token}:{token:string}) {
    const myHeaders = new Headers();
    myHeaders.append("X-CSRF-TOKEN", token);
    myHeaders.append("Content-Type", "application/json");

    async function fetchPost(data :object ,url: string ) {

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return await fetch(`http://localhost:8000/${url}`, requestOptions)
            .then((response) => response.json())
            .then((result) => result)
    }

    async function fetchPut(data :object ,url: string ) {

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return await fetch(`http://localhost:8000/${url}`, requestOptions)
            .then((response) => response.json())
            .then((result) => result)
    }


    async function fetchDelete(data :object ,url: string ) {

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return await fetch(`http://localhost:8000/${url}`, requestOptions)
            .then((response) => response.json())
            .then((result) => result)
    }

    return {
        fetchPost,
        fetchPut,
        fetchDelete,
    }
}
