import 'package:capstone_mobile/shared/models/stayz_models.dart';

class DestinationFood {
  const DestinationFood({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.priceRange,
    required this.recommendedSpots,
  });

  factory DestinationFood.fromJson(Map<String, dynamic> json) {
    return DestinationFood(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      imageUrl: json['image_url']?.toString() ?? '',
      priceRange: json['price_range']?.toString() ?? '',
      recommendedSpots: (json['recommended_spots'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
    );
  }

  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final String priceRange;
  final List<String> recommendedSpots;
}

class DestinationActivity {
  const DestinationActivity({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.category,
    required this.locationName,
  });

  factory DestinationActivity.fromJson(Map<String, dynamic> json) {
    return DestinationActivity(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      imageUrl: json['image_url']?.toString() ?? '',
      category: json['category']?.toString() ?? '',
      locationName: json['location_name']?.toString() ?? '',
    );
  }

  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final String category;
  final String locationName;
}

class DestinationModel {
  const DestinationModel({
    required this.id,
    required this.slug,
    required this.name,
    required this.country,
    required this.description,
    required this.isDomestic,
    required this.rating,
    required this.reviewCount,
    required this.coverImageUrl,
    required this.imageUrls,
    required this.foods,
    required this.activities,
    required this.properties,
  });

  factory DestinationModel.fromJson(Map<String, dynamic> json) {
    final rawProperties = json['properties'];
    final propertiesList = <HotelSummary>[];

    if (rawProperties is List) {
      for (final p in rawProperties) {
        if (p is Map<String, dynamic>) {
          final hotelId = p['_id']?.toString() ?? p['id']?.toString() ?? '';
          final hotelName = p['name']?.toString() ?? '';
          final desc = p['description']?.toString() ?? '';
          final address = p['address']?.toString() ?? '';
          final cityId = p['city_id']?.toString() ?? p['city']?.toString() ?? '';
          final cityName = p['city_name']?.toString() ?? p['city']?.toString() ?? '';
          final star = (p['star_rating'] as num?)?.toInt() ?? (p['starRating'] as num?)?.toInt() ?? 5;
          final imgs = (p['image_urls'] as List<dynamic>?)?.map((e) => e.toString()).toList() ??
              (p['imageUrls'] as List<dynamic>?)?.map((e) => e.toString()).toList() ??
              const <String>[];
          final price = (p['lowest_price'] as num?) ?? (p['lowestPrice'] as num?) ?? 0;
          final ratingVal = (p['rating'] as num?)?.toDouble() ?? 4.9;
          final reviewCnt = (p['review_count'] as num?)?.toInt() ?? (p['reviewCount'] as num?)?.toInt() ?? 10;

          propertiesList.add(
            HotelSummary(
              hotel: Hotel(
                id: hotelId,
                cityId: cityId,
                name: hotelName,
                description: desc,
                address: address,
                latitude: 0,
                longitude: 0,
                starRating: star,
                checkInTime: '14:00',
                checkOutTime: '12:00',
                amenityIds: const [],
                imageUrls: imgs,
                status: 'featured',
              ),
              city: City(
                id: cityId,
                name: cityName,
                countryCode: 'VN',
                region: '',
                status: 'active',
              ),
              lowestPrice: price,
              availableRooms: 5,
              rating: ratingVal,
              reviewCount: reviewCnt,
            ),
          );
        }
      }
    }

    return DestinationModel(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      slug: json['slug']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      country: json['country']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      isDomestic: json['is_domestic'] == true,
      rating: (json['rating'] as num?)?.toDouble() ?? 4.9,
      reviewCount: (json['review_count'] as num?)?.toInt() ?? 120,
      coverImageUrl: json['cover_image_url']?.toString() ?? '',
      imageUrls: (json['image_urls'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
      foods: (json['foods'] as List<dynamic>?)
              ?.whereType<Map<String, dynamic>>()
              .map(DestinationFood.fromJson)
              .toList() ??
          const [],
      activities: (json['activities'] as List<dynamic>?)
              ?.whereType<Map<String, dynamic>>()
              .map(DestinationActivity.fromJson)
              .toList() ??
          const [],
      properties: propertiesList,
    );
  }

  final String id;
  final String slug;
  final String name;
  final String country;
  final String description;
  final bool isDomestic;
  final double rating;
  final int reviewCount;
  final String coverImageUrl;
  final List<String> imageUrls;
  final List<DestinationFood> foods;
  final List<DestinationActivity> activities;
  final List<HotelSummary> properties;
}
