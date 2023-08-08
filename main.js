"use strict";
$(() => {

  //Cards array - > 
  let cards = [];
  // More Info ARRAY - > 
  let moreInfoArr = [];
  // Modal Arr - >
  let modalArr = [];
  // Selected cards array ->
  let selectedCardsData = [];


  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


  // On-load -> Display first page . ->->
  getAndDisplayCards();

  // ---------------------------------------

  // Containers - > 
  const displayContainer = document.getElementById("displayContainer");
  const inputSearchBar = document.getElementById("inputSearchBar");
  const contactUs = document.getElementById("contactUs");
  const aboutUs = document.getElementById("aboutUs");
  const selectedGraph = document.getElementById("selectedGraph");







  // Context Navigation ->
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

  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


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

  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


  // *-*-*-*-*-*-*-*-*-*-
  // --------------------------------Display Cards SECTION ----------------------------------------------------

  // *-*-*-*-*-*-*-*-*-*-



  // Get and display cards function -->
  async function getAndDisplayCards() {
    cards = await getApi("api.json");
    displayCards(cards)
  }

  // *-*-*-*-*-*-*-*-*-*-
  // -----------------------------------------------------------------------------------------------------------
  // *-*-*-*-*-*-*-*-*-*-

  // Get Container 

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
            <input class="form-check-input" type="checkbox" role="switch" id="${cards[i].id}">
        </div>

        <div class="card-body">
            <!-- title -->
          
            <!-- Button -->

            </div>
            <div class="dataContainer">
           
            <button class="moreInfoBtn" id="${cards[i].id}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample${[i]}" aria-expanded="false" aria-controls="collapseWidthExample">
              More Info     <img src="assets/images/currency-exchange.svg" class="more-info-icon">

              
              <div class="spinner-border" role="status" style="display: none;"></div>
            
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

    // ---------------------------------------------------------------------------------------------------------------------------------

    // More Info Button -->

    $(".moreInfoBtn").one("click", async function () {

      // Spinner ->
      const spinner = $(this).closest(".dataContainer").find(".spinner-border");
      spinner.show();

      // Get data ->
      const json = await getSecondApi(this.id);
      // Hide Spinner ->
      spinner.hide();

      const dataExist = moreInfoArr.find(item => item.id === json.id);
      if (!dataExist) {
        moreInfoArr.push(json);
        console.log(moreInfoArr); // delete - after use

        // Catch which button have been pressed ->
        const container = $(this).closest(".dataContainer");
        console.log(container);// delete - after use
        const cardBodyInfo = container.find(".card-body-info");
        // Push to Html ->
        cardBodyInfo.html(`
      
       <ul>
          <li>Israeli : ${json.market_data.current_price.ils}  ₪ </li>
          <li>Euro : ${json.market_data.current_price.eur}  € </li>
          <li>Dollar : ${json.market_data.current_price.usd}  $</li>
       </ul>
        `)
        //  If exist - >
      } else {

        console.log(`Data already exist in array, Saving again is unnecessary`);

      }
      // Save to local storage
      const strData = JSON.stringify(moreInfoArr);
      sessionStorage.setItem("savedData", strData);
    });

    // ---------------------------------------------------------------------------------------------------------------------------------

    // End of Display cards Function -> 

  }

  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // ----------------------------------------------------- Modal  Section ! ----------------------------------------------------
  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-



  // Get modal and prevent modal from closing without toggle or X button ->
  const modal = new bootstrap.Modal(`#coinModal`, {
    backdrop: 'static',
    keyboard: false,
  });

  // Pop modal while 6 cards have been chosen - >
  $("#displayContainer").on("click", ".form-check-input", function () {
    const cardId = $(this).closest(".card").find(".moreInfoBtn").attr("id");
    console.log(`card id is ${cardId}`);
    const index = modalArr.indexOf(cardId);
    // If exist ->
    if (index !== -1) {
      modalArr.splice(index, 1);
      $(`#${cardId}_modalSwitch`).prop("checked", false);
      // If not exist ->
    } else {
      modalArr.push(cardId);
      $(`#${cardId}_modalSwitch`).prop("checked", true);
      console.log(modalArr);
    }

    // If 6 cards chosen ->
    if (modalArr.length >= 6) {
      showModal();
    }
  });
  // ---------------------------------------------------------------------------------------------------------------------------------

  // Show modal function -- > 

  function showModal() {
    // Compare chosen cards id and push them to the modal->
    for (const id of modalArr) {
      const cardData = cards.find(card => card.id === id);
      if (cardData && selectedCardsData.length < 6) {

        selectedCardsData.push(cardData);
        console.log(`Name: ${cardData.name}`);
        console.log(`Selected : ` + " " + selectedCardsData);

      }

    }


    // Clear modal html ->
    let modalHtml = "";
    // push data to modal html ->
    for (const data of selectedCardsData) {
      modalHtml += `
    <div class="card">
      <h5 class="card-header">${data.symbol}</h5>
        <div class="logo-title">
         
          <img src="${data.image}" class="modal-logo" alt="my-logo" width="20%">
            <br></br>
              <h5 class="card-title">${data.name}</h5>
        </div>

              <div class="form-check form-switch">
                <p class="arrow-modal">↻</p>
                <input class="form-check-input-modal" type="checkbox" role="switch" id="${data.id}_modalSwitch">
            </div>
    </div>
          
          `
      console.log(data.name);
    }





    // Insert inside html ->
    $(".modal-body").html(modalHtml);
    modalHtml = ""
    // Pop modal ->
    modal.show();

    // Closing modal button - > 

    $(".close").one("click", () => {
      // Get the id of the last card
      const lastSelectedCardId = modalArr[modalArr.length - 1];
      const cardCheckbox = $(`#${lastSelectedCardId}`);
      // Splice the last card that pushed to the array
      modalArr.splice(modalArr.length - 1, 1);
      // Hide the modal - >
      modal.hide();
      // Uncheck the last card on the main screen
      cardCheckbox.prop("checked", false);
    })

    // Modal toggle button  -->

    $(".modal-body .form-check-input-modal").one("click", function () {
      // Get all checked cards array
      const checkBox = document.getElementsByClassName(`form-check-input`);
      // Get the id 
      const modalCardId = this.id.replace("_modalSwitch", "");
      // Get his index
      const modalIndex = modalArr.indexOf(modalCardId);
      // Check if exist and check/uncheck ->
      if (modalIndex !== -1) {
        modalArr.splice(modalIndex, 1);
        for (const item of checkBox) {
          let x = item
          if (x.id === modalCardId) {
            x.checked = false
          }
        }
      }
      // If not exist ->
      else {
        modalArr.push(modalCardId);
        $(".form-check-input").find(`#${modalCardId}`).prop("checked", true);
      }

      // Hide the modal
      modal.hide();

      // End of click function ->

    });

    // End of modal function
  }



  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // ----------------------------------------------------- Search Bar Section ! ----------------------------------------------------
  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


  // Display - Filtered Container Function 
  function displayFilteredCards(filteredCards) {
    // Message if not find any match ->
    if (filteredCards.length === 0) {
      displayContainer.innerHTML = `
      <div class ="not-found-div">
      <h1>ERROR : The currency was not found,Please check your spelling.</h1>
      <br></br>
      <img src="assets/images/try-again.jpeg" alt="Try-Again">
      </div>

      `;
    }
    // If does find - >
    else {
      let html = "";
      for (let i = 0; i < filteredCards.length; i++) {
        html += `

        <div class="card">
        <h5 class="card-header">${filteredCards[i].symbol}</h5>
            <div class="logo-title">
            <!-- logo -->
            <img src="${filteredCards[i].image}" class="card-coin-logo" alt="">
            <h5 class="card-title">${filteredCards[i].name}</h5>
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
      }

      displayContainer.innerHTML = html;
    }

    // Clear other pages ->
    aboutUs.innerHTML = "";
    contactUs.innerHTML = "";
    selectedGraph.innerHTML = "";

    // Display Filtered Cards function end -->
  }

  // Get input searchbar

  inputSearchBar.addEventListener("input", function () {
    const searchTerm = inputSearchBar.value.toLowerCase();

    if (searchTerm === "") {
      getAndDisplayCards();

    } else {
      const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm) || card.symbol.toLowerCase().includes(searchTerm));
      displayFilteredCards(filteredCards);
      console.log(filteredCards);
    }
  });
  // .........................................  



  // ============================================================================================================
  // * ********------------------------------------------Other Pages ---------------------------------------*****
  // ============================================================================================================


  // ---> Contact Us Page ->

  // Get Container

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
                <p>April 18, 1998 🎈</p> 
               
                <h4>Address:</h4>
                <p>Bachar Zaav,Tel haim,Tel-Aviv 🏡 </p>
        
                <h4>School Education:</h4>
                <p>"Irony-Tet" High School.</p>
                <img src="assets/images/ironyTet.png" alt="john-bryce" class="img-fluid rounded-circle" width ="20%">
                <br></br>

                <h4>Academic Education:</h4>
                <p>John-Bryce Academic </p>
                <img src="assets/images/jblogo.png" alt="irony-tet" class="img-fluid rounded-circle" width ="20%">
                <br></br>

              </div>
              <div class="col-md-6">
                <h4>Military Service:</h4>
                <p>I served in the military from 2016 to 2019. During my service, I gained valuable skills and experiences.</p>
                <img src="assets/images/gloani.png" alt="golani" class="img-fluid rounded-circle" width ="20%">
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



