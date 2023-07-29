"use strict";
$(() => {

  // More Info ARRAY - > 
  const moreInfoArr = [];
  // *-*-*-*-*-*-*-*-*-*-

  // Session storage function() ->

  function saveToSessionStorage() {
    const strData = JSON.stringify(moreInfoArr);
    console.log(typeof strData);
    sessionStorage.setItem("savedData", strData);
  }

  // On-load -> Display first page . ->->
  getAndDisplayCards();

  // ---------------------------------------

  // Context Navigation
  const liveReportsLink = document.getElementById("liveReportsLink");
  const contactUsLink = document.getElementById("contactUsLink");
  const aboutUsLink = document.getElementById("aboutUsLink");
  const selectedGraphLink = document.getElementById("selectedGraphLink");

  // Live Reports ->

  liveReportsLink.addEventListener("click", () => {
    getAndDisplayCards();
  });

  // Contact Us ->

  contactUsLink.addEventListener("click", () => {
    displayContactUs()
  })

  // About us ->

  aboutUsLink.addEventListener("click", () => {
    displayAboutUs()
  })

  // Live selected graph -->

  selectedGraphLink.addEventListener("click", () => {
    displayLiveSelected();
  })




  // *-*-*-*-*-*-*-*-*-*-
  // --------------------------------API PULL SECTION ----------------------------------------------------
  // *-*-*-*-*-*-*-*-*-*-


  // Get API ->
  async function getApi(url) {

    const data = await fetch(url);
    const json = await data.json();
    return json;
  }

  // Get Second Details (API2)

  async function getSecondApi(values) {

    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${values}`);
    const json = await data.json();
    return json;
  }

  // ------------------------------------------------------------------------------------------------------------


  // *-*-*-*-*-*-*-*-*-*-
  // --------------------------------Display Cards SECTION ----------------------------------------------------

  // *-*-*-*-*-*-*-*-*-*-

  // Get and display cards function -->
  async function getAndDisplayCards() {
    const cards = await getApi("api.json");
    displayCards(cards)
  }
  // ----------------------------------

  // Get Container -->
  const displayContainer = document.getElementById("displayContainer");

  // Display - Container -->

  function displayCards(cards) {

    let html = ""
    for (let i = 0; i < cards.length; i++) {
      html += `
        <div class="card">
        <h5 class="card-header">${cards[i].symbol}</h5>
            <div class="logo-title">
            <!-- logo -->
            <img src="${cards[i].image}" class="card-coin-logo" alt="">
            <h5 class="card-title">${cards[i].name}</h5>
            </div>
              <!-- Switch box -->
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
        </div>

        <div class="card-body">
            <!-- title -->
          
            <!-- Button -->

            </div>
            <div class="dataContainer">
           
            <button class="moreInfoBtn" id="${cards[i].id}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample${[i]}" aria-expanded="false" aria-controls="collapseWidthExample">
              More Info (ℹ)
            
              </button>
       
          <div>
            <div class="collapse collapse-horizontal" id="collapseWidthExample${[i]}">
              <div class="card-body-info"  style="width: 300px;">
              <div></div>
              
              </div>
            </div>
          </div>
    
 
        </div>
    </div>
        `


    } // --> Loop End

    displayContainer.innerHTML = html
    // ---------------------------------------------------------------------------------------------------------------------------------
    // Clear other pages -->

    aboutUs.innerHTML = "";
    contactUs.innerHTML = "";
    selectedGraph.innerHTML = "";


    // More Info Button -->
    $(".moreInfoBtn").on("click", async function () {
      const json = await getSecondApi(this.id);

      const dataExist = moreInfoArr.find(item => item.id === json.id);
      if (!dataExist) {
        moreInfoArr.push(json);
        console.log(moreInfoArr)

        const container = $(this).closest(".dataContainer");

        const cardBodyInfo = container.find(".card-body-info");


        cardBodyInfo.html(`
      
       <ul>
          <li>Israeli : ${json.market_data.current_price.ils}  ₪ </li>
          <li>Euro : ${json.market_data.current_price.eur}  € </li>
          <li>Dollar : ${json.market_data.current_price.usd}  $</li>
      </ul>
        `)

        saveToSessionStorage();
      } else {
        console.log(`Data already exist in array, Saving again is unnecessary`);
      }
    });

    // ---------------------------------------------------------------------------

    // ----------------------------------------------------- Search Bar Section ! ----------------------------------------------------

    const inputSearchBar = document.getElementById("inputSearchBar");

    inputSearchBar.addEventListener("keyup", function () {
      const searchTerm = inputSearchBar.value.toLowerCase();

      if (searchTerm === "") {
        getAndDisplayCards();
        console.log(searchTerm); // Restore original display <-
      } else {
        const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm));
        displayFilteredCards(filteredCards);
        console.log(filteredCards);

      }
    });

    // ----------------------------------------------------- Modal  Section ! ----------------------------------------------------

    const modal = new bootstrap.Modal(`#coinModal`);
    let modalArr = [];


    $("#displayContainer").on("click", ".form-check-input", function () {
      const cardId = $(this).closest(".card").find(".moreInfoBtn").attr("id");

      const index = modalArr.indexOf(cardId);
      if (index !== -1) {
        modalArr.splice(index, 1);
      } else {
        modalArr.push(cardId);
      }
      console.log(modalArr);

      if (modalArr.length === 6) {
        showModal();
      

      }
      
      $(".modal-body").on("click","#flexSwitch",function(){
        // Need to splice after ill catch the id of the toggled button inside the modal  (instead of clear modalArr)
        modalArr = [];
        console.log(modalArr);
        $("#flexSwitchCheckDefault").prop("checked", false);
        modal.hide()

        });



    
      

// Show modal function.
     function showModal() {
        const selectedCardsData = [];


        for (const id of modalArr) {
          const cardData = cards.find(card => card.id === id);
          if(cardData){
            selectedCardsData.push(cardData)
          }
         
        }

        console.log(selectedCardsData);

        let modalHtml = "";
        for (const data of selectedCardsData) {
          modalHtml += `
          <div class="card">
          <h5 class="card-header">${data.symbol}</h5>
          <div class="logo-title">
            <!-- logo -->
            <img src="${data.image}" class="modal-logo" alt="my-logo" width="20%">
            <br></br>
            <h5 class="card-title">${data.name}</h5>
          </div>
          <!-- Switch box -->
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch">
          </div>
        </div>
          
          `
        }



        // Insert inside htm;
        $(".modal-body").html(modalHtml);
        $("#selectedGraphLink").attr("data-bs-toggle", "modal").attr("data-bs-target", "#coinModal");
        modal.show()
      }

    })

    // Display - Filtered Container Function 


    function displayFilteredCards(filteredCards) {
      displayContainer.innerHTML = "";
      displayCards(filteredCards);
    }

    // .........................................  


    // End of Display cards Function 
  }


  // ============================================================================================================
  // * ********------------------------------------------Other Pages ---------------------------------------*****
  // ============================================================================================================


  // ---> Contact Us Page ->

  // Get Container
  const contactUs = document.getElementById("contactUs");

  function displayContactUs() {

    let html = `

    <section id="contact" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
        <img src="assets/images/contact.jpeg" alt="contact" class="img-fluid rounded-circle" id="contact-us-img">
          <h2 class="text-center mb-4">Contact Us 📩</h2>
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Name:</label>
              <input type="text" class="form-control" id="name" required placeholder="Insert Your Name 📛">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" class="form-control" id="email" required placeholder="Insert Your E-mail 📧">
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">Message:</label>
              <textarea class="form-control" id="message" rows="4" required></textarea placeholder="Insert Your Message 📬">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer Section -->
  <footer class="bg-dark text-white py-3">
    <div class="container text-center">
      <p>&copy; 2023 Crypto-4-U. All rights reserved.</p>
    </div>
  </footer>
`

    contactUs.innerHTML = html;
    // Clear Other Pages -->

    displayContainer.innerHTML = "";
    aboutUs.innerHTML = "";
    selectedGraph.innerHTML = "";

  }
  // ============================================================================================================

  // -> About Us Page -->

  // Get Container
  const aboutUs = document.getElementById("aboutUs");

  function displayAboutUs() {

    let html = `

    <!-- About Section -->
    <section id="about" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h2 class="display-4">About Me</h2>
            <p class="lead">
            Hey there , my name is Uziel cohen. I Am a developer.
            <br>
            Hope you having a great time 📍
            </p>
            <br>
            <h3>My Knowledge : </h3>
            <div class="knowledge-div>
            <img src="assets/images/html.jpeg" alt="html" class="img-fluid rounded-circle" width ="20%">
            <img src="assets/images/css.png" alt="css" class="img-fluid rounded-circle" width ="20%">
            <img src="assets/images/js.png" alt="js" class="img-fluid rounded-circle" width ="20%">
            <img src="assets/images/jq.png" alt="jquerry" class="img-fluid rounded-circle" width ="20%">
            
            </div>
            <br>
            <div class="container mt-5">
            <h2 class="mb-4">My Information</h2>
            <div class="row">
              <div class="col-md-6">
                <h4>Birthday:</h4>
                <p>April 18, 1998</p>
        
                <h4>School Education:</h4>
                <p>"Irony-Tet" High School</p>
                <img src="assets/images/ironyTet.png" alt="john-bryce" class="img-fluid rounded-circle" width ="10%">
                <br>

                <h4>Academic Education:</h4>
                <p>John-Bryce Academic </p>
                <img src="assets/images/jblogo.png" alt="irony-tet" class="img-fluid rounded-circle" width ="10%">
                <br>

              </div>
              <div class="col-md-6">
                <h4>Military Service:</h4>
                <p>I served in the military from 2016 to 2019. During my service, I gained valuable skills and experiences.</p>
                <img src="assets/images/gloani.png" alt="golani" class="img-fluid rounded-circle" width ="10%">
                <br>

                <h4>Previous Jobs:</h4>
                <p>After i've done my military service,I opened a little delivery company on my own while i managed a store with few workers.
                <br>
                Few years later i left the country to work in California as a sales man for few months,Came back to israel and started to study fullstack web development in John bryce Academic.
                  </p>

              </div>
            </div>
          </div>

          </div>
          <div class="col-lg-6">
            <img src="assets/images/me.jpg" alt="Uziel" class="img-fluid rounded-circle">
          </div>
        </div>
      </div>
    </section>
  
  

  `

    aboutUs.innerHTML = html;
    // Clear Other Pages ->

    contactUs.innerHTML = "";
    displayContainer.innerHTML = "";
    selectedGraph.innerHTML = "";
  }


  // ==========================================================================================================================


  // Live graph page ---- > 

  // Get container ->

  const selectedGraph = document.getElementById("selectedGraph");

  function displayLiveSelected() {

    let html = `

    <img src ="assets/images/under-construction.jpeg" class="coming-soon">
   
    <h5>Thank you for your patient</h5>
 
  
    `
    selectedGraph.innerHTML = html;
    // Clear other pages ->
    aboutUs.innerHTML = "";
    displayContainer.innerHTML = "";
    contactUs.innerHTML = "";
  }











  // End Of the code.
});



