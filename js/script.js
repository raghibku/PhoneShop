const phonesContainer = document.getElementById("phoneContainer");
const searchField = document.getElementById('searchField');
const showAllContainer=document.getElementById('ShowAllButton');
const loader =document.getElementById('loader');
const modalCotainer=document.getElementById('modalContainer');
let isShowAll=false;

const loadPhone = async (searchText="iphone",isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll) => {
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    if(!isShowAll){
        phones=phones.slice(0,12);
    }
    
    phones.forEach((phone)=>{
        const phoneCard = document.createElement('div');
        phoneCard.classList=`card card-compact w-80 mx-auto bg-black my-4 shadow-xl`
        phoneCard.innerHTML=`
        <figure><div class="bg-gray-300 mt-8 rounded-lg"><img src="${phone.image}" alt="${phone.slug}" class="px-8 py-4 " /><div></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Avallable in our shop</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(phoneCard);
        
    })
    loading(false);
}

function handleSearch(isShowAll){
    loading(true);
    phonesContainer.innerHTML='';
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll);
}
function loading(isLoading){
    if(isLoading){
        loader.classList.remove('hidden')
    }
    else{
        loader.classList.add('hidden')
    }
}
function handleShowAll(){
    isShowAll=true;
    handleSearch(isShowAll);
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone=data.data;
    displayPhoneDetail(phone)
}
const displayPhoneDetail=(phone)=>{
    modalCotainer.innerHTML=`
    <dialog id="my_modal_1" class="modal">
            <form method="dialog" class="modal-box">
                <div class="w-full flex justify-center items-center">
                    <div class="bg-gray-300 px-8 py-3 rounded-xl">
                        <img  src="${phone.image}" alt="">
                    </div>
                </div>
                <h3  class="font-bold text-lg text-center">${phone.name}</h3>
                <p class="pb-2">This exclusive phone is available at our shop</p>
                <p class="text-sm pb-1"><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
                <p class="text-sm pb-1"><span class="font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
                <p class="text-sm pb-1"><span class="font-bold">Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
                <p class="text-sm"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
                
                <div class="modal-action">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </div>
            </form>
    </dialog>
    `
    my_modal_1.showModal();
    console.log(phone);
}
loadPhone();