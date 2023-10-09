<script>
  async function stats() {
    // const res = await fetch(
    //   `http://localhost:1337/api/viewgraph/vecka`,

    return await fetch(
      `http://localhost:1337/api/viewgraph/vecka`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          //   Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg2NTE1ODU4LCJleHAiOjE2ODkxMDc4NTh9.KxlUh1HLDHQNWcsajKVguBPA9Bj9_JIQE7ecI9224ww`,
        },
      }
    )
      .then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((res) => {
            console.log(res.status, res.data);
          })
      )
      

    console.log(res.json());
  }
</script>

<div>
  <button on:click={stats}> Login </button>
</div>
