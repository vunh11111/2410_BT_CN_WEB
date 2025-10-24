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