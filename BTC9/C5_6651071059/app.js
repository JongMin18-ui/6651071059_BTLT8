
const { createApp } = Vue;

createApp({
    data() {
        return {
            tuKhoa: "",
            danhMuc: "Tất cả",
            cart: [],
            thongBao: "",

            products: [
                {
                    id: 1,
                    ten: "Ốp lưng trong suốt",
                    danhMuc: "Ốp lưng",
                    gia: 89000,
                    anh: "https://images.unsplash.com/photo-1603313011108-4c4f7d4f1d70?auto=format&fit=crop&w=700&q=80",
                    moTa: "Ốp mỏng nhẹ, hạn chế trầy xước.",
                    nhan: "Bán chạy"
                },
                {
                    id: 2,
                    ten: "Ốp lưng chống sốc",
                    danhMuc: "Ốp lưng",
                    gia: 129000,
                    anh: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=700&q=80",
                    moTa: "Viền bảo vệ, thiết kế hiện đại.",
                    nhan: "Phổ biến"
                },
                {
                    id: 3,
                    ten: "Tai nghe không dây",
                    danhMuc: "Âm thanh",
                    gia: 459000,
                    anh: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80",
                    moTa: "Gọn nhẹ, phù hợp nghe nhạc hằng ngày.",
                    nhan: "Mới"
                },
                {
                    id: 4,
                    ten: "Tai nghe chụp tai",
                    danhMuc: "Âm thanh",
                    gia: 599000,
                    anh: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
                    moTa: "Đệm tai êm, kiểu dáng hiện đại.",
                    nhan: ""
                },
                {
                    id: 5,
                    ten: "Củ sạc nhanh 20W",
                    danhMuc: "Sạc và cáp",
                    gia: 199000,
                    anh: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80",
                    moTa: "Nhỏ gọn, tiện mang theo.",
                    nhan: "Giảm giá"
                },
                {
                    id: 6,
                    ten: "Cáp sạc Type-C",
                    danhMuc: "Sạc và cáp",
                    gia: 79000,
                    anh: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=700&q=80",
                    moTa: "Cáp sạc dành cho thiết bị tương thích.",
                    nhan: ""
                },
                {
                    id: 7,
                    ten: "Giá đỡ điện thoại",
                    danhMuc: "Khác",
                    gia: 99000,
                    anh: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=700&q=80",
                    moTa: "Hỗ trợ xem phim và học trực tuyến.",
                    nhan: "Tiện ích"
                },
                {
                    id: 8,
                    ten: "Pin sạc dự phòng",
                    danhMuc: "Sạc và cáp",
                    gia: 389000,
                    anh: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=80",
                    moTa: "Bổ sung năng lượng khi di chuyển.",
                    nhan: ""
                }
            ]
        };
    },

    computed: {
        // Lọc sản phẩm theo từ khóa và danh mục đã chọn.
        danhSachLoc() {
            const tuKhoaNho = this.tuKhoa.trim().toLowerCase();

            return this.products.filter((sp) => {
                const khopTuKhoa =
                    sp.ten.toLowerCase().includes(tuKhoaNho) ||
                    sp.moTa.toLowerCase().includes(tuKhoaNho) ||
                    sp.danhMuc.toLowerCase().includes(tuKhoaNho);

                const khopDanhMuc =
                    this.danhMuc === "Tất cả" ||
                    sp.danhMuc === this.danhMuc;

                return khopTuKhoa && khopDanhMuc;
            });
        },

        // Tính tổng số lượng sản phẩm trong giỏ.
        cartCount() {
            return this.cart.reduce((tong, sp) => tong + sp.soLuong, 0);
        },

        // Tính tổng tiền của toàn bộ giỏ hàng.
        tongTien() {
            return this.cart.reduce(
                (tong, sp) => tong + sp.gia * sp.soLuong,
                0
            );
        }
    },

    methods: {
        // Định dạng số tiền theo đơn vị Việt Nam đồng.
        dinhDangTien(soTien) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 0
            }).format(soTien);
        },

        // Thêm sản phẩm vào giỏ hoặc tăng số lượng nếu sản phẩm đã tồn tại.
        themVaoGio(sp) {
            const sanPhamTrongGio = this.cart.find(
                (mon) => mon.id === sp.id
            );

            if (sanPhamTrongGio) {
                sanPhamTrongGio.soLuong++;
            } else {
                this.cart.push({
                    ...sp,
                    soLuong: 1
                });
            }

            this.thongBao = "Đã thêm " + sp.ten + " vào giỏ hàng.";
        },

        // Xóa một sản phẩm khỏi giỏ hàng theo vị trí.
        xoaKhoiGio(index) {
            const ten = this.cart[index].ten;
            this.cart.splice(index, 1);
            this.thongBao = "Đã xóa " + ten + " khỏi giỏ hàng.";
        },

        // Tăng số lượng sản phẩm được chọn.
        tangSoLuong(index) {
            this.cart[index].soLuong++;
            this.thongBao = "";
        },

        // Giảm số lượng nhưng không thấp hơn 1.
        giamSoLuong(index) {
            if (this.cart[index].soLuong > 1) {
                this.cart[index].soLuong--;
            }

            this.thongBao = "";
        },

        // Xóa tất cả sản phẩm trong giỏ.
        xoaTatCa() {
            this.cart = [];
            this.thongBao = "Giỏ hàng đã được làm trống.";
        },

        // Mô phỏng đặt hàng; chưa kết nối máy chủ hoặc thanh toán.
        datHang() {
            if (this.cart.length === 0) {
                this.thongBao = "Vui lòng thêm sản phẩm trước khi đặt hàng.";
                return;
            }

            this.thongBao =
                "Đặt hàng demo thành công! Tổng đơn: " +
                this.dinhDangTien(this.tongTien);

            this.cart = [];
        }
    }
}).mount("#app");