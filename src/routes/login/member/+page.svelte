<script>
    import { writable, get } from "svelte/store";

    let input = null;
    const userFound = writable(false);
    const activeMemberShip = writable(false);
    const annualFee = writable(false);
    const memberID = writable(null);

    function personnummerLogik(nummer) {
        let nrString = nummer.toString();
        nrString = nrString.replace("-", "");
        let fyraSista = nrString.slice(-4);

        if (nrString.length != 6 && 8) {
            let fodelseNR = nrString.slice(0, nrString.length - 4).toString();

            if (fodelseNR.length === 8) {
                fodelseNR = fodelseNR.replace(
                    /(\d{4})(\d{2})(\d{2})/,
                    "$1-$2-$3"
                );
                console.log(
                    "🚀 ~ file: +page.svelte:21 ~ personnummerLogik ~ fodelseNR:",
                    fodelseNR
                );
            } else {
                //TODO
                // Den ger mit rätt formatering med bindessträck när det är 6 siffor. ex input 121212 out 12-12-12.
                // Nu ska jag bara lägga till 19 eller 20 framför. i denna else satsen
                fodelseNR = fodelseNR.replace(
                    /(\d{2})(\d{2})(\d{2})/,
                    "$1-$2-$3"
                );
                console.log(
                    "🚀 ~ file: +page.svelte:26 ~ personnummerLogik ~ fodelseNR:",
                    fodelseNR
                );
                debugger;
            }
        } else {
            input = null;
            return;
        }
    }

    async function memberSearch() {
        personnummerLogik(input);
        const apiRespons = writable("rndomdtext");
        const memberShips = writable([]);
        memberID.set(input);
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
        input = null;
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

<div class="flex flex-col">
    <div class="pb-10">
        {#if $memberID === null || ($memberID.trim() === "" && $annualFee === false && $userFound === false && $activeMemberShip === false)}
            <div
                class="bg-slate-100 border-l-4 border-slate-500 text-slate-700 p-6 relative"
            >
                <div>
                    <p class="font-bold">Välkommen!</p>
                    <p>Vänligen fyll i ditt personnummer</p>
                </div>
            </div>
        {:else if $activeMemberShip === true && $userFound === true && $annualFee === true}
            <div
                class="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 relative"
            >
                <div>
                    <p class="font-bold">Allt gick bra!</p>
                    <p>Välkommen in.</p>
                </div>
                <div class="relative md:absolute  bottom-0 right-0">
                    <svg
                        class="h-24 w-24 text-green-900 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
        {:else if $userFound === false && $annualFee == false}
            <div
                class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 relative"
                role="alert"
            >
                <div>
                    <p class="font-bold">Personen finns inte.</p>
                    <p>Användaren finns inte i systmet, försök igen.</p>
                </div>
                <div class="relative md:absolute bottom-0 right-0 ">
                    <svg
                        class="h-24 w-24 text-red-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polygon
                            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                        /> <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" /></svg
                    >
                </div>
            </div>
        {:else}
            <div
                class="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 relative"
                role="alert"
            >
                <div>
                    <p class="font-bold">Någon hände!</p>
                    <p>Prata med personalen och uppge ditt personnummer.</p>
                </div>
                <div class="relative md:absolute bottom-0 right-0 ">
                    <svg
                        class="h-24 w-24 text-red-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polygon
                            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                        /> <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" /></svg
                    >
                </div>
            </div>
        {/if}
    </div>

    <!-- <br />
        active memmersship : {$activeMemberShip} <br />
        memberID : {$memberID} <br />
        userfound : {$userFound}<br />
        annualFee : {$annualFee}<br />
        <br /> -->
    <div>
        <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Personnummer</label
        >

        <input
            name="medlems id"
            bind:value={input}
            type="memberID"
            id="large-input"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    </div>
    <!-- <input
        type="memberID"
        bind:value={input}
        name="medlems id"
        placeholder="medlems id"
    /> -->
    <div class="pt-20 flex flex-col items-center">
        <div>
            <button
                on:click={memberSearch}
                class="bg-blue-500 text-white font-sans py-20 px-96 rounded "
            >
                Sök
            </button>
        </div>
    </div>
</div>
