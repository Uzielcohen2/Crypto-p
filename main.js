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
    const modalArr = [];

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
        modal.show();
      }

    })
    // Get Modal Cards into html -->

    const firstCard = document.getElementById("firstCard");
    let modalHtml = "";
    for (let i = 0; i < modalArr.length; i++) {
      const cardData = modalArr[i];
      modalHtml += `
      <div class="card">
            <h5 class="card-header">${cardData.symbol}</h5>
        <div class="logo-title">
           <!-- logo -->
           <img src="${cardData[i].image}" class="card-coin-logo" alt="">
           <h5 class="card-title">${cardData[i].name}</h5>
      </div>
          <!-- Switch box -->
       <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      </div>
      </div>

`
    }
    firstCard.innerHTML = modalHtml /// -- Fucking not workingggggg



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
    !--Section: Contact v.2-->
    section class="mb-4">

        <!--Section heading-->
        <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
        <!--Section description-->
        <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
            a matter of hours to help you.</p>

    <div class="row">

        <!--Grid column-->
        <div class="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                <!--Grid row-->
                <div class="row">

                    <!--Grid column-->
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="name" name="name" class="form-control">
                            <label for="name" class="">Your name</label>
                        </div>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="email" name="email" class="form-control">
                            <label for="email" class="">Your email</label>
                        </div>
                    </div>
                    <!--Grid column-->

                </div>
                <!--Grid row-->

                <!--Grid row-->
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" id="subject" name="subject" class="form-control">
                            <label for="subject" class="">Subject</label>
                        </div>
                    </div>
                </div>
                <!--Grid row-->

                <!--Grid row-->
                <div class="row">

                    <!--Grid column-->
                    <div class="col-md-12">

                        <div class="md-form">
                            <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                            <label for="message">Your message</label>
                        </div>

                    </div>
                </div>
                <!--Grid row-->

            </form>

            <div class="text-center text-md-left">
                <a class="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Send</a>
            </div>
            <div class="status"></div>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-3 text-center">
            <ul class="list-unstyled mb-0">
                <li><i class="fas fa-map-marker-alt fa-2x"></i>
                    <p>San Francisco, CA 94126, USA</p>
                </li>

                <li><i class="fas fa-phone mt-4 fa-2x"></i>
                    <p>+ 01 234 567 89</p>
                </li>

                <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                    <p>contact@mdbootstrap.com</p>
                </li>
            </ul>
        </div>
        <!--Grid column-->

    </div>

</section>
<!--Section: Contact v.2-->

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
  <div class="about-section">

  <h1 class="about-us-title">About me </h1>
  <p>Just some things about me that you probably wanna know...</p>
  <p>All the rights reserve to Uziel Cohen ©</p>


<h2 class="about-me-title">⬇ Check My Card ⬇</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="assets/images/me.jpg" alt="Jane" style="width:100%">
      <div class="card-container">
        <h2>Uziel Cohen</h2>
        <p class="title">Full Stack Web Developer</p>
        <p>I am developer since 2023,feel free to contact me.</p>
        <p>Uzielcohen2@gmail.com</p>
        <p><button class="button-about">Contact</button></p>
      </div>
    </div>
    <br></br>

    <div class="details-about">
    <label>Academic Education</label>
    <div class="graph-1">50%</div>
    <br>
    <label>School Education</label>
    <div class="graph-2">100%</div>
    <br></br>
    <label>Academic Experience</label>
    <div class="graph-3">20%</div>
    
  </div>
  
  
  </div>

  <div class="about-exp">
  <h1 class="exp-title">My Knowledge 🧠
  <img src="assets/images/css.png" class="about-exp-images" alt="">
  <img src="assets/images/html.jpeg" class="about-exp-images" alt="">
  <img src="assets/images/jq.png" class="about-exp-images" alt="">
  <img src="assets/images/js.png" class="about-exp-images" alt="">
</h1>
  </div>

  <div class="social-media">
  <h1>Social Media</h1>
  </div>

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
    <h1 id="liveGraphTitle">Coming soon...</h1>
  
    <img src="assets/images/under-construction.jpeg" alt="" id="liveImg">
 
  
    `
    selectedGraph.innerHTML = html;
    // Clear other pages ->
    aboutUs.innerHTML = "";
    displayContainer.innerHTML = "";
    contactUs.innerHTML = "";
  }











// End Of the code.
});



