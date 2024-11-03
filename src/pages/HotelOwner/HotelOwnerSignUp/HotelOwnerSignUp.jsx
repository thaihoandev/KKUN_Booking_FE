import React from "react";

function HotelOwnerSignUp() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="form-container">
                {/* Thêm ảnh logo vào form */}
                {/* <div className="text-center mb-4">
                    <img
                        src="/assets/img/logo_kkun/Trans_logo_kkunbooking.png"
                        alt="KKUN Booking Logo"
                        style={{ width: '750px', height: 'auto' }}
                    />
                </div> */}

                {/* <div className="form-header">
                    <img src="assets/img/bg-login-.jpg" alt="Register Modal Header" style={{ height: '170px', width: '100%', objectFit: 'cover' }} />
                </div> */}
                
                <div className="form-body p-4">
                    <h2>Tạo tài khoản mới</h2>
                    <p>Nhập thông tin tài khoản để đăng ký.</p>
                    <form>
                        <div className="form-group d-flex justify-content-between">
                            <input type="text" placeholder="Họ*" className="form-control me-2" name="lastName" />
                            <input type="text" placeholder="Tên*" className="form-control ms-2" name="firstName" />
                        </div>
                        <div className="form-group mt-4">
                            <input type="text" placeholder="Địa chỉ email*" className="form-control" name="email" />
                        </div>
                        <div className="form-group mt-4">
                            <input type="password" placeholder="Mật khẩu*" className="form-control" name="password" />
                        </div>
                        <div className="form-group mt-4">
                            <input type="password" placeholder="Xác nhận mật khẩu*" className="form-control" name="rePassword" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 w-100">Đăng ký</button>
                    </form>
                    <p className="mt-4">
                        Dữ liệu của bạn sẽ được dùng để hỗ trợ trải nghiệm khi sử dụng website, quản lý tài khoản và các mục đích khác được mô tả trong <strong><a href="/">chính sách bảo mật</a></strong> của chúng tôi.
                    </p>
                    <p>Đã có tài khoản? <a className="text-danger" href="/"><b>Đăng nhập</b></a></p>
                </div>
            </div>
        </div>
    );
}



export default HotelOwnerSignUp;
