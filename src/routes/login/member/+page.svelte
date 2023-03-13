<script>
    import { writable, get } from "svelte/store";

    let input = null;
    const userFound = writable(false);
    const activeMemberShip = writable(false);
    const annualFee = writable(false);
    const memberID = writable(null);

    async function memberSearch() {
        const apiRespons = writable("rndomdtext");
        const memberShips = writable([]);
        memberID.set(input);

        console.log(
            "🚀 ~ file: +page.svelte:28 ~ memberSearch ~ input:",
            get(memberID)
        );
        const inputElement = document.querySelector("[name='medlems id']");
        inputElement.value = "";

        const res = await fetch(
            `http://localhost:1337/api/members/${get(memberID)}?populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );

        apiRespons.set(await res.json());
        //svelte derived kolla på det

        if (get(apiRespons).data !== null) {
            annualFee.set(get(apiRespons).data.attributes.annualFee);
            memberShips.set(get(apiRespons).data.attributes.memberships.data);

            await get(memberShips).forEach((element) => {
                const startDate = Date.parse(element.attributes.startDate);
                const stopDate = Date.parse(element.attributes.stopDate);
                const today = Date.now();

                if (
                    startDate <= today &&
                    stopDate >= today &&
                    get(annualFee) === true
                ) {
                    console.log("🚀 ~ ja det är aktivt", get(memberID));
                    activeMemberShip.set(true);
                } else {
                    console.log("🚀 ~ nej kortet är inte aktivt");
                    activeMemberShip.set(false);
                }
                userFound.set(true);
                input = null;
            });
        } else {
            userFound.set(false);
            annualFee.set(false);
        }
    }
</script>

<div>
    <div>
        <!-- 
        {#if $memberID === null || $memberID.trim() === ""}
            <p>Vänligen fyll i dina uppgifter</p>
        {:else if $activeMemberShip === true && $userFound === true && $annualFee === true}
            <p>Välkommen, ha så kul!</p>
        {:else if $activeMemberShip === true && $annualFee === false && $userFound === true || $activeMemberShip === false && $annualFee === true && $userFound === true || $activeMemberShip === false && $annualFee === false && $userFound === true}
            <p>Ett fel uppstod, prata med personalen</p>
        {:else if $userFound === false && $annualFee == false}
            <p>Användaren finns inte i systmet, försök igen.</p>
        {/if} -->

        {#if $memberID === null || ($memberID.trim() === "" && $annualFee === false && $userFound === false && $activeMemberShip === false)}
            <p>Vänligen fyll i dina uppgifter</p>
        {:else if $activeMemberShip === true && $userFound === true && $annualFee === true}
            <p>Välkommen, ha så kul!</p>
        {:else if $userFound === false && $annualFee == false}
            <p>Användaren finns inte i systmet, försök igen.</p>
        {:else}
            <p>Ett fel uppstod, prata med personalen</p>
        {/if}

        <br />
        active memmersship : {$activeMemberShip} <br />
        memberID : {$memberID} <br />
        userfound : {$userFound}<br />
        annualFee : {$annualFee}<br />
        <br />
    </div>
    <input
        type="memberID"
        bind:value={input}
        name="medlems id"
        placeholder="medlems id"
    />

    <button on:click={memberSearch}> Sök </button>
    <!-- <button on:click={memberSearch}> Sök </button> -->
</div>
