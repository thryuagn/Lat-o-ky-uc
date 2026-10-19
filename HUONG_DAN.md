# LẬT Ô KÝ ỨC – TOÀN BỘ MÃ NGUỒN

## 1. Mở chơi ngay, không cài đặt

1. Giải nén toàn bộ tệp ZIP.
2. Vào thư mục `offline`.
3. Mở `index.html` bằng Chrome, Edge hoặc Firefox.
4. Giữ `index.html`, `styles.css` và `game.js` trong cùng thư mục.

Bản này chơi trên một máy: chỉnh tên ba đội, sửa điểm, quay lại thao tác, chỉnh cặp thẻ và tải ảnh, đặt thời gian xem trước/cặp đúng/cặp sai. Các thành viên có thể nhìn cùng màn hình máy chiếu.

Ảnh mặc định được nhúng trong JavaScript. Nếu không có mạng, trình duyệt dùng font dự phòng. Nội dung bạn sửa trong trình duyệt được lưu riêng trên thiết bị đó, không có sẵn trong gói mã nguồn xuất từ máy chủ. Để mang những chỉnh sửa ấy theo, dùng nút Xuất cấu hình trên trang hiện tại, rồi Nhập cấu hình trong bản offline.

Nếu dùng nút tải bản offline khi đang mở một tệp file:// mà trình duyệt chặn, hãy sao chép cả thư mục offline thay vì dùng nút tải. Nút tải trên bản web vẫn sử dụng như bình thường.

## 2. Những tệp chính

- `offline/index.html`: giao diện bản chơi chung một máy.
- `offline/styles.css`: toàn bộ CSS của bản offline.
- `offline/game.js`: toàn bộ JavaScript của bản offline, gồm ảnh nhúng.
- `source/public/game.html`: bản gốc tự chứa HTML, CSS và JavaScript của chế độ chơi chung.
- `source/public/online.html`: giao diện chế độ nhiều nhóm, HTML/CSS/JavaScript trong một tệp.
- `online-separated/`: cùng giao diện nhiều nhóm, đã tách thành index.html, styles.css và online.js để dễ đọc/sửa.
- `source/app/api/match/route.ts`: máy chủ tạo mã trận, nhận nhóm, lật thẻ, tính điểm và thời gian, xếp hạng.
- `source/db/schema.ts`: cấu trúc cơ sở dữ liệu.
- `source/drizzle/`: các tệp khởi tạo cơ sở dữ liệu và lịch sử migration.
- `source/app/page.tsx`: trang gốc chuyển sang giao diện online.
- `source/package.json`, `source/pnpm-lock.yaml`: thư viện và phiên bản.
- `source/README.md`: hướng dẫn kỹ thuật của bộ khung dự án.

## 3. Sửa mã nguồn

Mở thư mục giải nén bằng VS Code hoặc trình soạn thảo văn bản. Dùng các tệp tách riêng trong offline để sửa bản offline. Bản triển khai hiện tại dùng các tệp trong source; sửa bản tách riêng sẽ không tự cập nhật các tệp gốc hoặc trang đã đăng.

Không dán file ZIP hay JavaScript vào Canva. Đây là ứng dụng web thực, không phải mẫu slide.

## 4. Chế độ mã trận cần máy chủ

Mở online.html trực tiếp không làm các thiết bị kết nối với nhau. Chế độ này cần API `/api/match`, cơ sở dữ liệu Cloudflare D1 và môi trường Vinext/Workers. Gói này bao gồm cả phần mã nguồn máy chủ (TypeScript), không chỉ HTML/CSS/JavaScript giao diện.

Trong chế độ online:
- Người tổ chức chọn 2–30 nhóm, thời lượng 30–3600 giây.
- Các nhóm vào bằng cùng mã trận.
- Máy chủ đồng bộ thời điểm bắt đầu và ghi nhận các lượt lật.
- Xếp hạng theo số cặp đúng, thời gian, rồi số lượt thử.
- Không thể thay toàn bộ phần máy chủ bằng cách chỉ mở một tệp HTML.

## 5. Chạy dự án đầy đủ trên máy phát triển

Yêu cầu Node.js >=22.13.0 và pnpm theo phiên bản ghi trong package.json. Các bước dưới đây dành cho người có kinh nghiệm lập trình:

```bash
cd source
pnpm install --frozen-lockfile
```

Bản mã nguồn sạch tự chọn profile portable khi không có `.sites-runtime`. Build dự án:

```bash
pnpm exec vinext build
```

Sau khi build thành công, tạo cơ sở dữ liệu local (lần đầu, KHÔNG chạy lặp trên database đã có bảng):

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_pretty_madripoor.sql
```

Chạy Worker local:

```bash
pnpm start
```

Địa chỉ local do Wrangler in trong terminal. Phiên bản hiện tại yêu cầu header xác thực do Sites cấp khi tạo trận. Khi tự triển khai ngoài Sites, bạn phải tích hợp xác thực cho người tổ chức và cấu hình D1 tương ứng. Không bỏ kiểm tra xác thực hoặc cho khách tùy ý tự khai header ở môi trường công khai.

Các bước chạy local phụ thuộc môi trường, quyền mạng và công cụ đã cài. Bản build đã được kiểm tra trong môi trường triển khai gốc; gói xuất chưa được kiểm tra trên máy Windows của bạn.

## 6. Đăng lên máy chủ khác

Đây là mã nguồn xuất từ một Site đang hoạt động. `.openai/hosting.json` giữ ID của Site gốc để thể hiện cấu hình nguồn. Đừng dùng ID đó để triển khai vào tài khoản hoặc dự án khác. Tạo dự án mới và cấu hình binding DB, migration, xác thực và công cụ deploy theo môi trường đích.

Không có token đăng nhập, khóa API, thông tin ghi Git, cơ sở dữ liệu trận đấu, node_modules hoặc lịch sử Git trong gói xuất. Các thư viện và giấy phép đi kèm được giữ trong source.
