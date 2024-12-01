// Bật navbar ở điện thoại
const menuIcon = document.querySelector(".menu");
const navRedirect = document.querySelector(".nav-redirect");
menuIcon.addEventListener("click", () => {
  if (navRedirect.classList.contains("active")) {
    navRedirect.classList.remove("active");
    setTimeout(() => {
      navRedirect.style.display = "none";
    }, 500);
  } else {
    navRedirect.style.display = "flex";
    searchBar.style.display = "none";
    resultsList.style.display = "none";
    userBox.style.display = "none";
    setTimeout(() => {
      navRedirect.classList.add("active");
      searchBar.classList.remove("active");
      userBox.classList.remove("active");
    }, 0);
  }
});

//Bật thanh tìm kiếm
const searchIcon = document.querySelector(".search");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector('#searchBar');
searchIcon.addEventListener("click", () => {
  if (searchBar.classList.contains("active")) {
    searchBar.classList.remove("active");
    setTimeout(() => {
      searchBar.style.display = "none";
      resultsList.style.display = "none";
    }, 0);
  } else {
    if (window.matchMedia("(max-width: 768px)").matches) {
      navRedirect.classList.remove("active");
      navRedirect.style.display = "none";
    }
    searchBar.style.display = "block";
    userBox.style.display = "none";
    searchInput.focus();
    setTimeout(() => {
      searchBar.classList.add("active");
      userBox.classList.remove("active");
    }, 0);
  }
});

//Bật khung user
const userButton = document.querySelector(".user")
const userBox = document.querySelector(".user-box")
userButton.addEventListener("click", () => {
  if (userBox.classList.contains("active")) {
    userBox.classList.remove("active");
    setTimeout(() => {
      userBox.style.display = "none";
    }, 0);
  } else {
    if (window.matchMedia("(max-width: 768px)").matches) {
      navRedirect.classList.remove("active");
      navRedirect.style.display = "none";
    }
    userBox.style.display = "flex";
    searchBar.style.display = "none";
    resultsList.style.display = "none";
    setTimeout(() => {
      userBox.classList.add("active");
      searchBar.classList.remove("active");
    }, 0);
  }
});

// Xoay mũi tên ở trên điện thoại
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    const dropdownTrigger = document.querySelector(".dropdown > a");
    const dropdownContent = document.querySelector(".dropdown-content");
    const arrow = document.querySelector(".dropdown .arrow");
    dropdownTrigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
        arrow.classList.remove("up");
        setTimeout(() => {
          dropdownContent.style.display = "none";
        }, 300);
      } else {
        dropdownContent.style.display = "flex";
        arrow.classList.add("up");
        setTimeout(() => {
          dropdownContent.classList.add("show");
        }, 0);
      }
    });
  }
});

// Chuyển mũi tên thành màu trắng khi được chọn
document.addEventListener("DOMContentLoaded", () => {
  const navRedirectMainLinks = document.querySelectorAll(".nav-redirect-main");
  navRedirectMainLinks.forEach((link) => {
    if (link.classList.contains("nav-redirect-main")) {
      const boxIcon = link.querySelector("box-icon");
      if (boxIcon) {
        boxIcon.setAttribute("color", "#ffffff");
      }
    }
  });
});

// Ẩn navbar onscroll
let lastScrollPosition = 0;
const navbar = document.querySelector('.nav-1');
window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > lastScrollPosition) {
    navbar.style.transform = 'translateY(-200%)';
    navbar.style.transition = 'transform 0.4s ease-in-out';
    navRedirect.classList.remove("active");
    searchBar.classList.remove("active");
    searchBar.style.display = "none";
    resultsList.style.display = "none";
    userBox.classList.remove("active");
    userBox.style.display = "none";
    if (window.innerWidth <= 768) {
        setTimeout(() => {
        navRedirect.style.display = "none";
        }, 400);
    }
  } else {
    navbar.style.transform = 'translateY(0)';
    navbar.style.transition = 'transform 0.4s ease-in-out';
  }
  lastScrollPosition = currentScrollPosition;
});

//search data
const data = [
  { name: "Ẩm thực", url: "/amthuc.html" },
  { name: "Bánh cuốn Thanh Trì", url: "/amthuc.html#banhcuonthanhtri" },
  { name: "Bún chả Hà Nội", url: "/amthuc.html#bunchahanoi" },
  { name: "Bún đậu", url: "/amthuc.html#bundau" },
  { name: "Chùa Một Cột", url: "/tour.html#chuamotcot" },
  { name: "Chè Hà Nội", url: "/amthuc.html#chehanoi" },
  { name: "Giới thiệu tổng quan về Hà Nội", url: "lichsu.html" },
  { name: "Lịch sử", url: "lichsu.html" },
  { name: "Lăng Chủ tịch", url: "/tour.html#langchutich" },
  { name: "Phở Hà Nôi", url: "/amthuc.html#phohanoi" },
  { name: "Phố Cổ Hà Nội", url: "/tour.html#phocohanoi" },
  { name: "Trang chủ", url: "/" },
  { name: "Tour du lịch", url: "/tour.html" },
  { name: "Triển lãm", url: "/trienlam.html" },
  { name: "Hồ Hoàn Kiếm", url: "/tour.html#hohoankiem" },
  { name: "Bản đồ Hà Nội", url: "/bando.html" },
  { name: "Liên Hệ", url: "/lienhe.html" },
];
const options = {
  keys: ["name"],
  threshold: 0.4,
};
const fuse = new Fuse(data, options);
const resultsList = document.getElementById("resultsList");
function displayResults(results) {
  resultsList.innerHTML = "";
  if (results.length === 0) {
    resultsList.innerHTML = "<li class='no-result'>Không tìm thấy kết quả</li>";
    return;
  }
  results.forEach((result) => {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    const icon = document.createElement("box-icon");
    icon.setAttribute("name", "search-alt");
    icon.setAttribute("color", "#070f2a");
    icon.setAttribute("size", "sm");
    icon.classList.add("search");
    const text = document.createTextNode(
      `${result.item.name}`
    );
    li.appendChild(icon);
    li.appendChild(text);
    li.addEventListener("click", () => {
      window.location.href = result.item.url;
    });
    resultsList.appendChild(li);
  });
}
searchBar.addEventListener("input", (e) => {
  const query = e.target.value;
  const results = fuse.search(query);
  resultsList.style.display = "block";
  displayResults(results);
});

//text trả lời survey
document.getElementById('submitBtn').addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="rating"]:checked');
  const responseElement = document.getElementById('response');

  if (selectedOption) {
      responseElement.textContent = `Cảm ơn bạn đã gửi đánh giá!`;
      responseElement.classList.remove('hidden');
  }
});