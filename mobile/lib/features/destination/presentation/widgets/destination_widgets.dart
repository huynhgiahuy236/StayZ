import 'package:capstone_mobile/app/theme/app_theme.dart';
import 'package:capstone_mobile/features/home/presentation/widgets/home_section_widgets.dart';
import 'package:capstone_mobile/shared/i18n/app_locale.dart';
import 'package:capstone_mobile/shared/models/destination_model.dart';
import 'package:capstone_mobile/shared/widgets/stayz_network_image.dart';
import 'package:flutter/material.dart';

class DestinationCard extends StatelessWidget {
  const DestinationCard({
    required this.destination,
    required this.onTap,
    this.width,
    this.height,
    super.key,
  });

  final DestinationModel destination;
  final VoidCallback onTap;
  final double? width;
  final double? height;

  @override
  Widget build(BuildContext context) {
    final responsive = HomeResponsive.of(context);
    final cardWidth = width ?? 240 * responsive.widthScale;
    final cardHeight = height ?? 280 * responsive.widthScale;

    return Container(
      width: cardWidth,
      height: cardHeight,
      margin: const EdgeInsets.only(right: 14),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        boxShadow: AppTheme.softShadow,
      ),
      child: Material(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(22),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(22),
          child: Stack(
            fit: StackFit.expand,
            children: [
              // Cover Image
              StayZNetworkImage(
                imageUrl: destination.coverImageUrl,
                width: cardWidth,
                height: cardHeight,
                fit: BoxFit.cover,
              ),

              // Gradient Overlay
              Positioned.fill(
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withValues(alpha: 0.2),
                        Colors.black.withValues(alpha: 0.85),
                      ],
                      stops: const [0.0, 0.45, 1.0],
                    ),
                  ),
                ),
              ),

              // Rating & Country Badge at Top
              Positioned(
                top: 12 * responsive.scale,
                left: 12 * responsive.widthScale,
                right: 12 * responsive.widthScale,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 10 * responsive.widthScale,
                        vertical: 4 * responsive.scale,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.5),
                        borderRadius: BorderRadius.circular(999),
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.25),
                        ),
                      ),
                      child: Text(
                        destination.isDomestic
                            ? tr('Trong nước', 'Domestic')
                            : destination.country,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 11 * responsive.scale,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 8 * responsive.widthScale,
                        vertical: 4 * responsive.scale,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFA16207).withValues(alpha: 0.9),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.star_rounded,
                            size: 14,
                            color: Colors.white,
                          ),
                          const SizedBox(width: 3),
                          Text(
                            destination.rating.toStringAsFixed(1),
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12 * responsive.scale,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Title & Info at Bottom
              Positioned(
                bottom: 14 * responsive.scale,
                left: 14 * responsive.widthScale,
                right: 14 * responsive.widthScale,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      destination.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20 * responsive.scale,
                        fontWeight: FontWeight.w900,
                        height: 1.1,
                      ),
                    ),
                    SizedBox(height: 4 * responsive.scale),
                    Text(
                      destination.description,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.85),
                        fontSize: 12 * responsive.scale,
                        height: 1.3,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    SizedBox(height: 10 * responsive.scale),
                    Row(
                      children: [
                        Text(
                          '${destination.properties.length} ${tr('Khách sạn', 'Hotels')}',
                          style: TextStyle(
                            color: const Color(0xFFFACC15),
                            fontSize: 12 * responsive.scale,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: Theme.of(context).colorScheme.primary,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.arrow_forward_rounded,
                            size: 14,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FoodCard extends StatelessWidget {
  const FoodCard({required this.food, super.key});

  final DestinationFood food;

  @override
  Widget build(BuildContext context) {
    final responsive = HomeResponsive.of(context);
    final imgSize = 100 * responsive.widthScale;

    return Container(
      margin: EdgeInsets.only(bottom: 14 * responsive.scale),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: Theme.of(context).colorScheme.outlineVariant,
        ),
        boxShadow: AppTheme.softShadow,
      ),
      child: Padding(
        padding: EdgeInsets.all(12 * responsive.scale),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(14),
              child: StayZNetworkImage(
                imageUrl: food.imageUrl,
                width: imgSize,
                height: imgSize,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(width: 14 * responsive.widthScale),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          food.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 16 * responsive.scale,
                            fontWeight: FontWeight.w800,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                        ),
                      ),
                      if (food.priceRange.isNotEmpty)
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 8 * responsive.widthScale,
                            vertical: 2 * responsive.scale,
                          ),
                          decoration: BoxDecoration(
                            color: Theme.of(context).colorScheme.primaryContainer,
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Text(
                            food.priceRange,
                            style: TextStyle(
                              fontSize: 11 * responsive.scale,
                              fontWeight: FontWeight.w800,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                          ),
                        ),
                    ],
                  ),
                  SizedBox(height: 6 * responsive.scale),
                  Text(
                    food.description,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 12 * responsive.scale,
                      color: Theme.of(context).colorScheme.secondary,
                      height: 1.35,
                    ),
                  ),
                  if (food.recommendedSpots.isNotEmpty) ...[
                    SizedBox(height: 8 * responsive.scale),
                    Row(
                      children: [
                        Icon(
                          Icons.restaurant_rounded,
                          size: 13 * responsive.scale,
                          color: const Color(0xFFA16207),
                        ),
                        SizedBox(width: 4 * responsive.widthScale),
                        Expanded(
                          child: Text(
                            food.recommendedSpots.join(', '),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontSize: 11 * responsive.scale,
                              fontWeight: FontWeight.w700,
                              color: const Color(0xFFA16207),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ActivityCard extends StatelessWidget {
  const ActivityCard({required this.activity, super.key});

  final DestinationActivity activity;

  @override
  Widget build(BuildContext context) {
    final responsive = HomeResponsive.of(context);
    final imgHeight = 140 * responsive.scale;

    return Container(
      margin: EdgeInsets.only(bottom: 14 * responsive.scale),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: Theme.of(context).colorScheme.outlineVariant,
        ),
        boxShadow: AppTheme.softShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(18)),
            child: SizedBox(
              height: imgHeight,
              width: double.infinity,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  StayZNetworkImage(
                    imageUrl: activity.imageUrl,
                    width: double.infinity,
                    height: imgHeight,
                    fit: BoxFit.cover,
                  ),
                  Positioned(
                    top: 10 * responsive.scale,
                    left: 10 * responsive.widthScale,
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 10 * responsive.widthScale,
                        vertical: 4 * responsive.scale,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.65),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        activity.category,
                        style: TextStyle(
                          color: const Color(0xFFFACC15),
                          fontSize: 11 * responsive.scale,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(14 * responsive.scale),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        activity.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 16 * responsive.scale,
                          fontWeight: FontWeight.w800,
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 6 * responsive.scale),
                Text(
                  activity.description,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 12 * responsive.scale,
                    color: Theme.of(context).colorScheme.secondary,
                    height: 1.35,
                  ),
                ),
                SizedBox(height: 10 * responsive.scale),
                Row(
                  children: [
                    Icon(
                      Icons.location_on_rounded,
                      size: 14 * responsive.scale,
                      color: Theme.of(context).colorScheme.primary,
                    ),
                    SizedBox(width: 4 * responsive.widthScale),
                    Expanded(
                      child: Text(
                        activity.locationName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 12 * responsive.scale,
                          fontWeight: FontWeight.w700,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
