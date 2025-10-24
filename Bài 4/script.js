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

// ===== HÀM HIỂN THỊ LỖI =====
function showError(inputElement, errorMessage) {
    // Xóa thông báo lỗi cũ nếu có
    clearError(inputElement);
    
    // Thêm class lỗi cho input
    inputElement.classList.add('error-input');
    
    // Tạo thẻ span thông báo lỗi
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.textContent = errorMessage;
    
    // Thêm thông báo lỗi sau input
    inputElement.parentElement.appendChild(errorSpan);
}

// ===== HÀM XÓA THÔNG BÁO LỖI =====
function clearError(inputElement) {
    // Xóa class lỗi
    inputElement.classList.remove('error-input');
    
    // Tìm và xóa thông báo lỗi nếu có
    const errorSpan = inputElement.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.remove();
    }
}

// ===== HÀM XÓA TẤT CẢ LỖI =====
function clearAllErrors() {
    const errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => clearError(input));
}

// ===== HÀM VALIDATION =====
function validateProductForm(name, desc, price) {
    let isValid = true;
    const nameInput = document.getElementById('productName');
    const descInput = document.getElementById('productDesc');
    const priceInput = document.getElementById('productPrice');
    
    // Xóa tất cả lỗi cũ trước khi validate
    clearAllErrors();
    
    // 1. Kiểm tra tên sản phẩm
    if (name.trim() === '') {
        showError(nameInput, 'Tên sản phẩm không được để trống!');
        isValid = false;
    } else if (name.trim().length < 3) {
        showError(nameInput, 'Tên sản phẩm phải có ít nhất 3 ký tự!');
        isValid = false;
    }
    
    // 2. Kiểm tra mô tả sản phẩm
    if (desc.trim() === '') {
        showError(descInput, 'Mô tả sản phẩm không được để trống!');
        isValid = false;
    } else if (desc.trim().length < 10) {
        showError(descInput, 'Mô tả sản phẩm phải có ít nhất 10 ký tự!');
        isValid = false;
    }
    
    // 3. Kiểm tra giá sản phẩm
    if (price === '' || price === null) {
        showError(priceInput, 'Giá sản phẩm không được để trống!');
        isValid = false;
    } else {
        const priceNumber = parseFloat(price);
        
        // Kiểm tra có phải là số hợp lệ không
        if (isNaN(priceNumber)) {
            showError(priceInput, 'Giá sản phẩm phải là số hợp lệ!');
            isValid = false;
        } 
        // Kiểm tra giá phải lớn hơn 0
        else if (priceNumber <= 0) {
            showError(priceInput, 'Giá sản phẩm phải lớn hơn 0!');
            isValid = false;
        }
        // Kiểm tra giá không quá lớn (tùy chọn)
        else if (priceNumber > 1000000000) {
            showError(priceInput, 'Giá sản phẩm không được vượt quá 1 tỷ VNĐ!');
            isValid = false;
        }
    }
    
    return isValid;
}

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
    
    // VALIDATION: Kiểm tra dữ liệu
    if (!validateProductForm(productName, productDesc, productPrice)) {
        // Nếu validation không pass, dừng lại và không thêm sản phẩm
        return;
    }
    
    // Tạo phần tử article mới
    const newProduct = document.createElement('article');
    
    // Thêm nội dung HTML cho sản phẩm mới
    newProduct.innerHTML = `
        <h3>${productName.trim()}</h3>
        <p>${productDesc.trim()}</p>
        <p class="price">${parseInt(productPrice).toLocaleString('vi-VN')} VNĐ</p>
    `;
    
    // Lấy danh sách sản phẩm
    const productsGrid = document.querySelector('.products-grid');
    
    // Thêm sản phẩm mới vào danh sách
    productsGrid.appendChild(newProduct);
    
    // Reset form (xóa dữ liệu đã nhập)
    productForm.reset();
    
    // Xóa tất cả thông báo lỗi
    clearAllErrors();
    
    // Ẩn form sau khi thêm
    addProductForm.style.display = 'none';
    toggleBtn.textContent = '+ Thêm sản phẩm mới';
    
    // Thông báo thành công
    alert('Đã thêm sản phẩm thành công!');
});

// ===== XÓA LỖI KHI NGƯỜI DÙNG BẮT ĐẦU NHẬP LẠI =====
// Tự động xóa lỗi khi người dùng bắt đầu sửa
document.getElementById('productName').addEventListener('input', function() {
    if (this.classList.contains('error-input')) {
        clearError(this);
    }
});

document.getElementById('productDesc').addEventListener('input', function() {
    if (this.classList.contains('error-input')) {
        clearError(this);
    }
});

document.getElementById('productPrice').addEventListener('input', function() {
    if (this.classList.contains('error-input')) {
        clearError(this);
    }
});