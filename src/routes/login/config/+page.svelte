<script>
import { post, browserSet } from '$lib/req_utils';
let username
let password

async function handelLogin(){
    console.log("hello")
    const json = await post(fetch, 'http://localhost:1337/api/auth/local', {identifier: username, password});

    if (json) {
        browserSet('jwt', json.jwt);
    }

}
</script>

<div>
    <input type="email" bind:value={username} name="email" placeholder="email" />
    <input type="password" bind:value={password} name="password" placeholder="password" />

    <button on:click={handelLogin}> Login </button>
</div>
