document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("srch-button");
    const textbox = document.getElementById("textbox");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const statsCardContainer = document.querySelector(".stats-card");




    async function fetchUserData(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
            try{
                searchButton.textContent = "Searching...";
                searchButton.disabled = true;
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Unable to fetch data");
                }
                const data = await response.json();
                console.log("logging in data: ", data);
                displayUserData(data);

                updateProgress(data.easySolved, data.totalEasy, easyLabel, easyProgressCircle);
                updateProgress(data.mediumSolved, data.totalMedium, mediumLabel, mediumProgressCircle);
                updateProgress(data.hardSolved, data.totalHard, hardLabel, hardProgressCircle);
            }
            catch(error){
                statsContainer.innerHTML = '<p> No data found</p>';
            }
            finally{
                searchButton.textContent = "Search";
                searchButton.disabled = false;
            }
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;

    }


    function displayUserData(data){
    const totalques = data.totalQuestions;
    const totalEasyques = data.totalEasy;
    const totalMediumques = data.totalMedium;
    const totalHardques = data.totalHard;

    const solvedTotalques = data.totalSolved;
    let total=document.querySelector(".total");
    total.innerText=`Total Solve :- ${solvedTotalques}/${totalques}`;
    const solvedEasyques = data.easySolved;
    const solvedMediumques = data.mediumSolved;
    const solvedHardques = data.hardSolved;
    }
    

    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;  
    }


    searchButton.addEventListener('click', function(){
        const username = textbox.value;
        if(validateUsername(username)){
            fetchUserData(username);
        }
    });
    


    

})







