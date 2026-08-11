import 'package:capstone_mobile/shared/i18n/app_locale.dart';
import 'package:flutter/material.dart';

/// Nguồn duy nhất ánh xạ giá trị enum trong database sang nhãn đa ngôn ngữ (Việt, Anh, Hàn, Nhật, Thái).
class StayzTerm {
  const StayzTerm({
    required this.slug,
    required String label,
    this.enLabel,
    this.koLabel,
    this.jaLabel,
    this.thLabel,
    this.icon,
  }) : _label = label;

  final String slug;
  final String _label;
  final String? enLabel;
  final String? koLabel;
  final String? jaLabel;
  final String? thLabel;
  final IconData? icon;

  String get label => tr(
        _label,
        enLabel ?? slug.replaceAll('_', ' '),
        ko: koLabel,
        ja: jaLabel,
        th: thLabel,
      );
}

class StayzTaxonomy {
  const StayzTaxonomy._();

  /// Khớp enum `city` trong `properties.model.js`.
  static const cities = <StayzTerm>[
    StayzTerm(
      slug: 'ha-noi',
      label: 'Hà Nội',
      enLabel: 'Hanoi',
      koLabel: '하노이',
      jaLabel: 'ハノイ',
      thLabel: 'ฮานอย',
    ),
    StayzTerm(
      slug: 'da-nang',
      label: 'Đà Nẵng',
      enLabel: 'Da Nang',
      koLabel: '다낭',
      jaLabel: 'ダナン',
      thLabel: 'ดานัง',
    ),
    StayzTerm(
      slug: 'da-lat',
      label: 'Đà Lạt',
      enLabel: 'Da Lat',
      koLabel: '달랏',
      jaLabel: 'ダラット',
      thLabel: 'ดาลัด',
    ),
    StayzTerm(
      slug: 'ho-chi-minh',
      label: 'TP.HCM',
      enLabel: 'Ho Chi Minh City',
      koLabel: '호치민시',
      jaLabel: 'ホーチミン',
      thLabel: 'โฮจิมินห์',
    ),
    StayzTerm(
      slug: 'vung-tau',
      label: 'Vũng Tàu',
      enLabel: 'Vung Tau',
      koLabel: '붕따우',
      jaLabel: 'ブンタウ',
      thLabel: 'วุงเต่า',
    ),
    StayzTerm(
      slug: 'bali',
      label: 'Bali',
      enLabel: 'Bali',
      koLabel: '발리',
      jaLabel: 'バリ島',
      thLabel: 'บาหลี',
    ),
    StayzTerm(
      slug: 'tokyo',
      label: 'Tokyo',
      enLabel: 'Tokyo',
      koLabel: '도쿄',
      jaLabel: '東京',
      thLabel: 'โตเกียว',
    ),
    StayzTerm(
      slug: 'bangkok',
      label: 'Bangkok',
      enLabel: 'Bangkok',
      koLabel: '방콕',
      jaLabel: 'バンコク',
      thLabel: 'กรุงเทพฯ',
    ),
    StayzTerm(
      slug: 'singapore',
      label: 'Singapore',
      enLabel: 'Singapore',
      koLabel: '싱가포르',
      jaLabel: 'シンガポール',
      thLabel: 'สิงคโปร์',
    ),
    StayzTerm(
      slug: 'seoul',
      label: 'Seoul',
      enLabel: 'Seoul',
      koLabel: '서울',
      jaLabel: 'ソウル',
      thLabel: 'โซล',
    ),
  ];

  /// Khớp enum `type` trong `properties.model.js`.
  static const propertyTypes = <StayzTerm>[
    StayzTerm(
      slug: 'hotel',
      label: 'Khách sạn',
      enLabel: 'Hotel',
      koLabel: '호텔',
      jaLabel: 'ホテル',
      thLabel: 'โรงแรม',
      icon: Icons.apartment_rounded,
    ),
    StayzTerm(
      slug: 'resort',
      label: 'Resort',
      enLabel: 'Resort',
      koLabel: '리조트',
      jaLabel: 'リゾート',
      thLabel: 'รีสอร์ท',
      icon: Icons.beach_access_rounded,
    ),
    StayzTerm(
      slug: 'villa',
      label: 'Biệt thự',
      enLabel: 'Villa',
      koLabel: '빌라',
      jaLabel: 'ヴィラ',
      thLabel: 'วิลล่า',
      icon: Icons.villa_rounded,
    ),
    StayzTerm(
      slug: 'apartment',
      label: 'Căn hộ',
      enLabel: 'Apartment',
      koLabel: '아파트',
      jaLabel: 'アパート',
      thLabel: 'อพาร์ทเมนท์',
      icon: Icons.house_rounded,
    ),
    StayzTerm(
      slug: 'business',
      label: 'Công tác',
      enLabel: 'Business',
      koLabel: '비즈니스',
      jaLabel: 'ビジネス',
      thLabel: 'ธุรกิจ',
      icon: Icons.business_center_rounded,
    ),
    StayzTerm(
      slug: 'hostel',
      label: 'Hostel',
      enLabel: 'Hostel',
      koLabel: '호스텔',
      jaLabel: 'ホステル',
      thLabel: 'โฮสเทล',
      icon: Icons.bed_rounded,
    ),
  ];

  /// Khớp enum `room_type` trong `rooms.model.js`.
  static const roomTypes = <StayzTerm>[
    StayzTerm(
      slug: 'standard_room',
      label: 'Tiêu chuẩn',
      enLabel: 'Standard',
      koLabel: '스탠다드',
      jaLabel: 'スタンダード',
      thLabel: 'มาตรฐาน',
    ),
    StayzTerm(
      slug: 'deluxe_room',
      label: 'Deluxe',
      enLabel: 'Deluxe',
      koLabel: '디럭스',
      jaLabel: 'デラックス',
      thLabel: 'ดีลักซ์',
    ),
    StayzTerm(
      slug: 'suite',
      label: 'Suite',
      enLabel: 'Suite',
      koLabel: '스위트',
      jaLabel: 'スイート',
      thLabel: 'สวีท',
    ),
  ];

  /// Khớp 10 khóa trong `properties.model.js -> amenities`.
  static const propertyAmenities = <StayzTerm>[
    StayzTerm(
      slug: 'free_wifi',
      label: 'Wifi miễn phí',
      enLabel: 'Free Wi-Fi',
      koLabel: '무료 Wi-Fi',
      jaLabel: '無料Wi-Fi',
      thLabel: 'ฟรี Wi-Fi',
      icon: Icons.wifi_rounded,
    ),
    StayzTerm(
      slug: 'outdoor_pool',
      label: 'Hồ bơi',
      enLabel: 'Outdoor pool',
      koLabel: '야외 수영장',
      jaLabel: '屋外プール',
      thLabel: 'สระว่ายน้ำ',
      icon: Icons.pool_rounded,
    ),
    StayzTerm(
      slug: 'breakfast',
      label: 'Bữa sáng',
      enLabel: 'Breakfast',
      koLabel: '조식 포함',
      jaLabel: '朝食付き',
      thLabel: 'อาหารเช้า',
      icon: Icons.free_breakfast_rounded,
    ),
    StayzTerm(
      slug: 'free_parking',
      label: 'Đỗ xe miễn phí',
      enLabel: 'Free parking',
      koLabel: '무료 주차',
      jaLabel: '無料駐車場',
      thLabel: 'ที่จอดรถฟรี',
      icon: Icons.local_parking_rounded,
    ),
    StayzTerm(
      slug: 'family_room',
      label: 'Phòng gia đình',
      enLabel: 'Family room',
      koLabel: '패밀리 룸',
      jaLabel: 'ファミリールーム',
      thLabel: 'ห้องครอบครัว',
      icon: Icons.family_restroom_rounded,
    ),
    StayzTerm(
      slug: 'restaurant',
      label: 'Nhà hàng',
      enLabel: 'Restaurant',
      koLabel: '레스토랑',
      jaLabel: 'レストラン',
      thLabel: 'ร้านอาหาร',
      icon: Icons.restaurant_rounded,
    ),
    StayzTerm(
      slug: 'airport_shuttle',
      label: 'Đưa đón sân bay',
      enLabel: 'Airport shuttle',
      koLabel: '공항 셔틀',
      jaLabel: '空港送迎',
      thLabel: 'บริการรับส่งสนามบิน',
      icon: Icons.airport_shuttle_rounded,
    ),
    StayzTerm(
      slug: 'room_service',
      label: 'Phục vụ phòng',
      enLabel: 'Room service',
      koLabel: '룸서비스',
      jaLabel: 'ルームサービス',
      thLabel: 'รูมเซอร์วิส',
      icon: Icons.room_service_rounded,
    ),
    StayzTerm(
      slug: 'bar',
      label: 'Quầy bar',
      enLabel: 'Bar',
      koLabel: '바',
      jaLabel: 'バー',
      thLabel: 'บาร์',
      icon: Icons.local_bar_rounded,
    ),
    StayzTerm(
      slug: 'non_smoking_room',
      label: 'Không hút thuốc',
      enLabel: 'Non-smoking room',
      koLabel: '금연 객실',
      jaLabel: '禁煙ルーム',
      thLabel: 'ห้องปลอดบุหรี่',
      icon: Icons.smoke_free_rounded,
    ),
  ];

  /// Khớp `rooms.model.js -> amenities` và `-> badges`.
  static const roomAmenities = <StayzTerm>[
    StayzTerm(
      slug: 'air_conditioning',
      label: 'Điều hòa',
      enLabel: 'Air conditioning',
      koLabel: '에어컨',
      jaLabel: 'エアコン',
      thLabel: 'เครื่องปรับอากาศ',
      icon: Icons.ac_unit_rounded,
    ),
    StayzTerm(
      slug: 'private_bathroom',
      label: 'Phòng tắm riêng',
      enLabel: 'Private bathroom',
      koLabel: '전용 욕실',
      jaLabel: '専用バスルーム',
      thLabel: 'ห้องน้ำส่วนตัว',
      icon: Icons.bathtub_rounded,
    ),
    StayzTerm(
      slug: 'balcony',
      label: 'Ban công',
      enLabel: 'Balcony',
      koLabel: '발코니',
      jaLabel: 'バルコニー',
      thLabel: 'ระเบียง',
      icon: Icons.balcony_rounded,
    ),
    StayzTerm(
      slug: 'terrace',
      label: 'Sân hiên',
      enLabel: 'Terrace',
      koLabel: '테라스',
      jaLabel: 'テラス',
      thLabel: 'เฉลียง',
      icon: Icons.deck_rounded,
    ),
    StayzTerm(
      slug: 'garden_view',
      label: 'View vườn',
      enLabel: 'Garden view',
      koLabel: '정원 전망',
      jaLabel: 'ガーデンビュー',
      thLabel: 'วิวสวน',
      icon: Icons.park_rounded,
    ),
    StayzTerm(
      slug: 'courtyard_view',
      label: 'View sân trong',
      enLabel: 'Courtyard view',
      koLabel: '안뜰 전망',
      jaLabel: '중정 뷰',
      thLabel: 'วิวลานบ้าน',
      icon: Icons.yard_rounded,
    ),
    StayzTerm(
      slug: 'free_wifi',
      label: 'Wifi',
      enLabel: 'Wi-Fi',
      koLabel: 'Wi-Fi',
      jaLabel: 'Wi-Fi',
      thLabel: 'Wi-Fi',
      icon: Icons.wifi_rounded,
    ),
  ];

  static StayzTerm? _find(List<StayzTerm> terms, String slug) {
    for (final term in terms) {
      if (term.slug == slug) return term;
    }
    return null;
  }

  static String cityLabel(String slug) => _find(cities, slug)?.label ?? slug;
  static String propertyTypeLabel(String slug) =>
      _find(propertyTypes, slug)?.label ?? slug;
  static String roomTypeLabel(String slug) =>
      _find(roomTypes, slug)?.label ?? slug;

  static StayzTerm amenityTerm(String slug) =>
      _find(propertyAmenities, slug) ??
      _find(roomAmenities, slug) ??
      StayzTerm(
        slug: slug,
        label: slug.replaceAll('_', ' '),
        icon: Icons.check_circle_outline_rounded,
      );

  static String bookingStatusLabel(String status) => switch (status) {
        'pending' => tr('Chờ xác nhận', 'Pending', ko: '대기 중', ja: '確認待ち', th: 'รอดำเนินการ'),
        'confirmed' => tr('Đã xác nhận', 'Confirmed', ko: '확정됨', ja: '確定済み', th: 'ยืนยันแล้ว'),
        'completed' => tr('Đã hoàn tất', 'Completed', ko: '완료됨', ja: '完了', th: 'เสร็จสมบูรณ์'),
        'cancelled' => tr('Đã hủy', 'Cancelled', ko: '취소됨', ja: 'キャンセル済み', th: 'ยกเลิกแล้ว'),
        _ => status,
      };

  static String paymentStatusLabel(String status) => switch (status) {
        'pending' => tr('Chưa thanh toán', 'Pending payment', ko: '결제 대기', ja: '未払い', th: 'รอการชำระเงิน'),
        'paid' => tr('Đã thanh toán', 'Paid', ko: '결제 완료', ja: '支払い済み', th: 'ชำระเงินแล้ว'),
        'failed' => tr('Thanh toán thất bại', 'Payment failed', ko: '결제 실패', ja: '支払い失敗', th: 'การชำระเงินล้มเหลว'),
        'refunded' => tr('Đã hoàn tiền', 'Refunded', ko: '환불됨', ja: '返金済み', th: 'คืนเงินแล้ว'),
        _ => status,
      };
}
