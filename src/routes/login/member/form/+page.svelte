<script>
    import { onMount } from 'svelte';
    let name;

    onMount(async () => {
        const res = await fetch('http://localhost:1337/api/users/me', {
            headers :{ 
                Authorization : `Bearer ${localStorage.getItem('jwt')}`,
                }
        
            })
        const json = await res.json();
        console.log("🚀 ~ file: +page.svelte:13 ~ onMount ~ json:", json);

        }
    )
</script>