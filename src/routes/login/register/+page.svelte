<script>
  import logo from "$lib/images/hkk.png";
  import { post, browserSet } from "$lib/req_utils";
  import { personnummerLogik } from "$lib/personHandler";
  import { writable } from "svelte/store";
  let username;
  let password;

  const result = writable("");
  let fornamn = "";
  let efternamn = "";
  let gatuAdress = "";
  let postNummer = "";
  let stad = "";
  let telefonNummer = "";
  let personNummer = "";
  let email = "";

  async function doPost() {
    if (
      fornamn === "" ||
      efternamn === "" ||
      gatuAdress === "" ||
      postNummer === "" ||
      stad === "" ||
      telefonNummer === "" ||
      personNummer === "" ||
      email === ""
    ) {
      alert("Du måste fylla i alla fält");
      return;
    }
    const res = await fetch("http://localhost:1337/api/members", {
      // const res = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: fornamn,
          lastName: efternamn,
          email: email,
          postNr: postNummer,
          adress: gatuAdress,
          telefonNr: telefonNummer,
          personNummer: personNummer,
          stad: stad,
        },
      }),
    });

    const json = await res.json();
    result.set(JSON.stringify(json));
  }
</script>

<div><p>{$result}</p></div>
<br />
<!-- <div><p>{$pa}</p></div> -->

<div class=" flex pt-40">
  <div class="w-1/3 logo"><img src={logo} alt="halmstadklätterklubb" /></div>
  <div class="w-2/3">
    <form>
      <div class="grid md:grid-cols-2 md:gap-6 ">
        <div class="relative z-0 w-full mb-6 group">
          <input
            bind:value={fornamn}
            type="text"
            id="floating_fornamn"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_fornamn"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Förnamn</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            bind:value={efternamn}
            type="text"
            id="floating_efternamn"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_efternamn"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Efternamn</label
          >
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6 ">
        <div class="relative z-0 w-full mb-6 group">
          <input
            bind:value={gatuAdress}
            type="text"
            id="floating_gatuadress"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_gatuadress"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Gatuadress</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input
              bind:value={email}
              type="text"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Email address</label
            >
          </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            bind:value={postNummer}
            type="text"
            id="floating_postnummer"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_postnummer"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Postnummer</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            bind:value={stad}
            type="text"
            id="floating_stad"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_stad"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Stad</label
          >
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            bind:value={telefonNummer}
            type="tel"
            id="floating_telefonnummer"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_telefonnummer"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Telefonnummer</label
          >
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input
              bind:value={personNummer}
              type="text"
              id="floating_personNummer"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <p
              id="helper-text-explanation"
              class="mt-2 text-xs text-gray-500 dark:text-gray-400"
            >
              ÅÅÅÅMMDDXXXX
            </p>
  
            <label
              for="floating_personNummer"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Personnummer</label
            >
          </div>
      </div>

      <button
        type="button"
        on:click={doPost}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Skicka ansökan</button
      >
    </form>
  </div>
</div>
