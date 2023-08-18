"use strict";
$(() => {

  //Cards Arr - > 
  let cards = [];
  // More Info Arr - > 
  let moreInfoArr = [];
  // Modal Arr - >
  let modalArr = [];

  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

  // On-load -> Display first page . ->->
  getAndDisplayCards();
  // ------------------------------------------------------------------------------------------------------------

  // Containers - > 
  const displayContainer = document.getElementById("displayContainer");
  const inputSearchBar = document.getElementById("inputSearchBar");
  const contactUs = document.getElementById("contactUs");
  const aboutUs = document.getElementById("aboutUs");
  const selectedGraph = document.getElementById("selectedGraph");
  // --------------------------------------------------------------------------------------------------------------

  // Context Navigation ->
  const liveReportsLink = document.getElementById("liveReportsLink");
  const contactUsLink = document.getElementById("contactUsLink");
  const aboutUsLink = document.getElementById("aboutUsLink");
  const selectedGraphLink = document.getElementById("selectedGraphLink");
  // --------------------------------------------------------------------------------------------------------------

  // Live Reports ->
  liveReportsLink.addEventListener("click", () => {
    getAndDisplayCards()
  });
  // **************
  // Contact Us ->
  contactUsLink.addEventListener("click", () => {
    displayContactUs()
  });
  // **************
  // About us ->
  aboutUsLink.addEventListener("click", () => {
    displayAboutUs()
  });
  // **************
  // Live selected graph -->
  selectedGraphLink.addEventListener("click", () => {
    displayLiveSelected()
  });
  // **************



  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // ---------------------------------------------------API PULL SECTION ----------------------------------------------------
  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // Get API ->
  async function getApi(url) {

    const data = await fetch(url);
    const json = await data.json();
    return json;
  }
  // Get Second Details (API2) ->
  async function getSecondApi(values) {

    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${values}`);
    const json = await data.json();
    return json;
  }
  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // --------------------------------Display Cards SECTION ----------------------------------------------------
  // *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

  // Get and display cards function -->

  async function getAndDisplayCards() {
    try {
      cards = await getApi("api.json");
      displayCards(cards)
      buttonMoreInfo()
    } catch (err) {
      console.log(`Fetch cards failed ${err}`);
    }
  }
  // -----------------------------------------------------------------------------------------------------------
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

  } //---> End of Display cards Function 
  // ---------------------------------------------------------------------------------------------------------------------------------

  // More Info Button -->
  function buttonMoreInfo() {
    $(".moreInfoBtn").on("click", async function () {
      const spinner = $(this).closest(".dataContainer").find(".spinner-border");

      try {
        // Check if the data already exists in session storage
        const savedData = sessionStorage.getItem("savedData");

        if (savedData) {
          moreInfoArr = JSON.parse(savedData);

          // Find the data for the clicked button
          const dataExist = moreInfoArr.find(item => item.data.id === this.id);
          if (dataExist) {
            // Check when data fetched ->
            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - dataExist.time;

            // If less than 2 minutes , use session storage data
            if (timeElapsed < 120000) {
              const container = $(this).closest(".dataContainer");
              const cardBodyInfo = container.find(".card-body-info");

              cardBodyInfo.html(`
                <ul>
                  <li>Israeli : ${dataExist.data.market_data.current_price.ils} ₪</li>
                  <li>Euro : ${dataExist.data.market_data.current_price.eur} €</li>
                  <li>Dollar : ${dataExist.data.market_data.current_price.usd} $</li>
                </ul>
              `);

              return; // Exit the function (Data loaded !)
            }
          }
        }

        // Show Spinner
        spinner.show();

        // Get data
        const json = await getSecondApi(this.id);

        // Add time prop
        const myTime = new Date().getTime();

        // Make an object with time prop
        const entry = {
          data: json,
          time: myTime
        };

        // Find the index 
        const indexExist = moreInfoArr.findIndex(item => item.data.id === json.id);
        if (indexExist !== -1) {
          // Replace 
          moreInfoArr[indexExist] = entry;
        } else {
          // Push
          moreInfoArr.push(entry);
        }

        // Display the fetched data
        const container = $(this).closest(".dataContainer");
        const cardBodyInfo = container.find(".card-body-info");

        cardBodyInfo.html(`
          <ul>
            <li>Israeli : ${json.market_data.current_price.ils} ₪</li>
            <li>Euro : ${json.market_data.current_price.eur} €</li>
            <li>Dollar : ${json.market_data.current_price.usd} $</li>
          </ul>
        `);

        // Save to local storage
        const strData = JSON.stringify(moreInfoArr);
        sessionStorage.setItem("savedData", strData);
      } catch (err) {
        console.log("Error fetching more info data:", err);
      } finally {
        // Hide Spinner after API call
        spinner.hide();
      }
    }); // - End of click button function 

  } // End of button function

  // -----------------------------------------------------------------------------------------------
  // Clear data after two minutes - > 
  setInterval(() => {
    const currentTime = new Date().getTime();
    moreInfoArr = moreInfoArr.filter(entry => {
      return currentTime - entry.myTime <= 120000; // 120000 milliseconds = 2 minutes
    });

    // Save updated array to sessionStorage - >
    const strData = JSON.stringify(moreInfoArr);
    sessionStorage.setItem("savedData", strData);
  }, 120000); // Run every 2 minute 

  // -----------------------------------------------------------------------------------------------





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
    const cardId = $(this).closest(".card").find(".form-check-input").attr("id");
    const index = modalArr.indexOf(cardId);
    // If exist ->
    if (index !== -1) {
      modalArr.splice(index, 1);
      $(`#${cardId}_modalSwitch`).prop("checked", false);
      // If not exist ->
    } else {
      modalArr.push(cardId);
      $(`#${cardId}_modalSwitch`).prop("checked", true);
    }

    // If 6 cards chosen pop modal on the screen ->
    if (modalArr.length === 6) {
      console.log(`modal is opening`);
      showModal();
    }
  });

  // ---------------------------------------------------------------------------------------------------------------------------------
  // Show modal function -- > 

  function showModal() {
    // Selected cards array ->
    let selectedCardsData = [];

    // Compare chosen cards id and push them to the modal->
    for (const id of modalArr) {
      const cardData = cards.find(card => card.id === id);
      if (cardData && selectedCardsData.length < 6) {

        selectedCardsData.push(cardData);
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

    } //----> Loop End !


    // Insert inside html ->
    $(".modal-body").html(modalHtml);
    // Pop modal ->
    modal.show();


    // Modal toggle button  -->

    $(".modal-body .form-check-input-modal").on("click", function () {
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



    });  // ----> End of click function <-----


  }; // ------>  End of modal function <-----


  // Close button function modal ->
  $(".close").on("click", () => {
    // Get the id of the last card

    const lastSelectedCardId = modalArr[modalArr.length - 1];
    if (lastSelectedCardId) {
      const cardCheckbox = $(`#${lastSelectedCardId}`);
      if (lastSelectedCardId) {
        // Splice the last card that pushed to the array
        modalArr.pop();
        // Hide the modal - >
        modal.hide();
        // Uncheck the last card on the main screen
        cardCheckbox.prop("checked", false);
      } else {
        return;
      }
    }
  });

  // End Of MODAL SECTION ! 

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

  }     // -----> Display Filtered Cards function end <-----

  // Get input searchbar -?
  inputSearchBar.addEventListener("input", function () {
    const searchTerm = inputSearchBar.value.toLowerCase();
    // If the input is empty -->
    if (searchTerm === "") {
      getAndDisplayCards();
      // Check if the value of the input is match to the name or symbol and display it -- >
    } else {
      const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm) || card.symbol.toLowerCase().includes(searchTerm));
      displayFilteredCards(filteredCards);
      buttonMoreInfo();
    }
  });


  // ============================================================================================================
  // * ********------------------------------------------Other Pages ---------------------------------------*****
  // ============================================================================================================


  // ---> Contact Us Page ->

  // Get Container

  function displayContactUs() {

    let html = `

    <section id="contact">
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
            <h3 class="knowledge">My Knowledge : </h3>
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
                <h4 class="info-title">Birthday:</h4>
                <p class="about-info">April 18, 1998 🎈</p> 
               
                <h4 class="info-title">Address:</h4>
                <p class="about-info">Bachar Zaav,Tel haim,Tel-Aviv 🏡 </p>
        
                <h4 class="info-title">School Education:</h4>
                <p  class="about-info">"Irony-Tet" High School.</p>
                <img src="assets/images/ironyTet.png" alt="john-bryce" class="img-fluid rounded-circle" width ="20%">
                <br></br>

                <h4 class="info-title">Academic Education:</h4>
                <p  class="about-info">John-Bryce Academic </p>
                <img src="assets/images/jblogo.png" alt="irony-tet" class="img-fluid rounded-circle" width ="20%">
                <br></br>

              </div>
              <div class="col-md-6">
                <h4 class="info-title">Military Service:</h4>
                <p  class="about-info">I served in the military from 2016 to 2019. During my service, I gained valuable skills and experiences.</p>
                <img src="assets/images/gloani.png" alt="golani" class="img-fluid rounded-circle" width ="20%">
                <br>

                <h4 class="info-title">Previous Jobs:</h4>
                <p  class="about-info">After i've done my military service,I opened a little delivery company on my own while i managed a store with few workers.
                <br>
                Few years later i left the country to work in California as a sales man for few months,Came back to israel and started to study fullstack web development in John bryce Academic.
                  </p>

              </div>
            </div>
          </div>

          </div>
          <div class="col-lg-6">
            <img src="assets/images/me.jpg" alt="Uziel" class="img-fluid rounded-circle">
            <h1 class ="services-title">Our services : </h1>
              <ul class ="our-services">
              <h3 class="info-title">Trading : </h3>

              <li  class="about-info">Trading Facilitating the buying, selling, and exchanging of various cryptocurrencies on online platforms.</li>
              <h3 class="info-title">Wallets : </h3>
              <li  class="about-info"> Providing secure digital wallets to store, send, and receive cryptocurrencies.</li>
              <h3 class="info-title">Educational Resources: </h3>
              <li  class="about-info">Providing tutorials, guides, and information to help users learn about cryptocurrencies, blockchain, and how to use them.</li>
              <h3 class="info-title">News and Analysis: </h3>
              <li  class="about-info">Delivering up-to-date news, trends, and analysis about the cryptocurrency market and blockchain technology.</li>
              </ul>

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

    <img src ="assets/images/coming-soon-2550190_640.jpg" class="coming-soon">
   
    <h5 class ="patient">Thank you for your patient</h5>
 
  
    `
    selectedGraph.innerHTML = html;
    // Clear other pages ->
    aboutUs.innerHTML = "";
    displayContainer.innerHTML = "";
    contactUs.innerHTML = "";
  }


  // End Of the code.
});



