// navbar 
const tab = document.querySelectorAll(".tab");

tab[0].checked = true;

tab.forEach((e)=>{
    e.addEventListener("click", (event)=>{
        // console.log(tab);
        tab.forEach((e)=>{
            e.checked = false;
            e.parentElement.classList.remove("active");
        })
        event.target.checked = true;
            e.parentElement.classList.add("active");
    })
});





//--------------------------- Toggle Body Scrooling ----------------------------------
function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling");
}





// -------------------------- Filter Articel  Items ---------------------------
const filterBtnsContainer = document.querySelector(".articel-filter");
let articelItems; // buatjuga ini 
filterBtnsContainer.addEventListener("click", (e) => {
    // console.log(e.target);
    if(e.target.classList.contains("articel-filter-btn") && !e.target.classList.contains("active")) {
        filterBtnsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        toggleBodyScrolling();
        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span>  articel`;
        setTimeout(() => {
            filterItems(e.target);
        },400);
        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodyScrolling();
        },800);
    }
});

function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".articel-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(",");
        if(category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
    articelItems = document.querySelectorAll(".articel-item.show"); //lalu ini.
    // console.log(articelItems);
} 
// Filter Active Category Articel Items
filterItems(document.querySelector(".articel-filter-btn.active"));



//-------------------------- Articel item Details Popup-----------------------------
let articelItemIndex; 
document.addEventListener("click", (e) => {
    if(e.target.closest(".articel-item")) {
        // console.log("hello");
        const currentItem = e.target.closest(".articel-item");
        // console.log(currentItem);
        articelItemIndex = Array.from(articelItems).indexOf(currentItem);
        // console.log(articelItemIndex);
        togglePopup();
        articelItemDetails();
        updateNextPrevItem();
    }
});

function togglePopup() {
    document.querySelector(".articel-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".close-btn").addEventListener("click", togglePopup);

// untuk responsive pada saat gambar diklick
function articelItemDetails() {

    // untuk gambar 
    document.querySelector(".pp-thumbnail img").src =
    articelItems[articelItemIndex].querySelector("img").src;

    // untuk title 
    document.querySelector(".pp-header h3").innerHTML =
    articelItems[articelItemIndex].querySelector(".articel-item-title").innerHTML;

    // untuk body 
    document.querySelector(".pp-body").innerHTML =
    articelItems[articelItemIndex].querySelector(".articel-item-details").innerHTML;

    // untuk counter angka 
    document.querySelector(".pp-counter").innerHTML = `${articelItemIndex+1} of ${articelItems.length} (<span title="category">${document.querySelector(".articel-filter-btn.active").innerHTML}</span>)`;
}


function updateNextPrevItem() {
    if(articelItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML =
        articelItems[articelItemIndex-1].querySelector("h3").innerHTML;

        // untuk responsive img 
        // document.querySelector(".pp-footer-left img").src =
        // articelItems[articelItemIndex-1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }

    if(articelItemIndex !== articelItems.length-1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML =
        articelItems[articelItemIndex+1].querySelector("h3").innerHTML;

        // untuk responsive img 
        // document.querySelector(".pp-footer-right img").src =
        // articelItems[articelItemIndex+1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

// berfungsi untuk mengganti page 
document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changeArticelItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changeArticelItem("next");
});

function changeArticelItem(direction) {
    // console.log(direction);
    if(direction == "prev") {
        articelItemIndex--;
    } else {
        articelItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0,0);
        articelItemDetails();
        updateNextPrevItem();
    },400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    },1000);
    
}






