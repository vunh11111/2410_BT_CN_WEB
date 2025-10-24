// ===== XỬ LÝ TÌM KIẾM SẢN PHẨM =====

// Lấy phần tử ô tìm kiếm
const searchInput = document.getElementById('searchInput');

// Gắn sự kiện keyup (mỗi khi người dùng gõ)
searchInput.addEventListener('keyup', function() {
    // Lấy giá trị tìm kiếm và chuyển về chữ thường
    const searchTerm = this.value.toLowerCase();
    
    // Lấy tất cả các sản phẩm (thẻ article)
    const products = document.querySelectorAll('.products-grid article');
    
    // Duyệt qua từng sản phẩm
    products.forEach(function(product) {
        // Lấy tên sản phẩm (thẻ h3)
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        // Kiểm tra xem tên có chứa từ khóa không
        if (productName.includes(searchTerm)) {
            // Hiển thị sản phẩm
            product.style.display = 'block';
        } else {
            // Ẩn sản phẩm
            product.style.display = 'none';
        }
    });
});


// ===== XỬ LÝ ẨN/HIỆN FORM THÊM SẢN PHẨM =====

// Lấy nút toggle và form
const toggleBtn = document.getElementById('toggleFormBtn');
const addProductForm = document.getElementById('addProductForm');

// Gắn sự kiện click cho nút
toggleBtn.addEventListener('click', function() {
    // Kiểm tra form đang ẩn hay hiện
    if (addProductForm.style.display === 'none') {
        // Nếu đang ẩn thì hiện
        addProductForm.style.display = 'block';
        toggleBtn.textContent = '- Đóng form';
    } else {
        // Nếu đang hiện thì ẩn
        addProductForm.style.display = 'none';
        toggleBtn.textContent = '+ Thêm sản phẩm mới';
    }
});


// ===== XỬ LÝ THÊM SẢN PHẨM MỚI =====

// Lấy form
const productForm = document.getElementById('productForm');

// Gắn sự kiện submit cho form
productForm.addEventListener('submit', function(e) {
    // Ngăn form reload trang
    e.preventDefault();
    
    // Lấy giá trị từ các ô input
    const productName = document.getElementById('productName').value;
    const productDesc = document.getElementById('productDesc').value;
    const productPrice = document.getElementById('productPrice').value;
    
    // Tạo phần tử article mới
    const newProduct = document.createElement('article');
    
    // Thêm nội dung HTML cho sản phẩm mới
    newProduct.innerHTML = `
        <h3>${productName}</h3>
        <p>${productDesc}</p>
        <p class="price">${parseInt(productPrice).toLocaleString('vi-VN')} VNĐ</p>
    `;
    
    // Lấy danh sách sản phẩm
    const productsGrid = document.querySelector('.products-grid');
    
    // Thêm sản phẩm mới vào danh sách
    productsGrid.appendChild(newProduct);
    
    // Reset form (xóa dữ liệu đã nhập)
    productForm.reset();
    
    // Ẩn form sau khi thêm
    addProductForm.style.display = 'none';
    toggleBtn.textContent = '+ Thêm sản phẩm mới';
    
    // Thông báo thành công
    alert('Đã thêm sản phẩm thành công!');
});