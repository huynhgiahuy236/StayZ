import 'package:capstone_mobile/app/routes/app_routes.dart';
import 'package:capstone_mobile/features/destination/presentation/widgets/destination_widgets.dart';
import 'package:capstone_mobile/features/home/presentation/widgets/home_section_widgets.dart';
import 'package:capstone_mobile/shared/data/stayz_formatters.dart';
import 'package:capstone_mobile/shared/i18n/app_locale.dart';
import 'package:capstone_mobile/shared/models/destination_model.dart';
import 'package:capstone_mobile/shared/repositories/stayz_repository.dart';
import 'package:capstone_mobile/shared/widgets/stayz_alert.dart';
import 'package:capstone_mobile/shared/widgets/stayz_network_image.dart';
import 'package:capstone_mobile/shared/widgets/stayz_state_views.dart';
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';

class DestinationDetailPage extends StatefulWidget {
  const DestinationDetailPage({
    required this.slug,
    this.initialDestination,
    super.key,
  });

  final String slug;
  final DestinationModel? initialDestination;

  @override
  State<DestinationDetailPage> createState() => _DestinationDetailPageState();
}

class _DestinationDetailPageState extends State<DestinationDetailPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late Future<DestinationModel?> _future;
  DestinationModel? _destination;
  bool _isFavorite = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _destination = widget.initialDestination;
    _future = _load();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<DestinationModel?> _load() async {
    final item =
        await ApiStayzRepository.instance.getDestinationBySlug(widget.slug);
    if (item != null && mounted) {
      setState(() {
        _destination = item;
      });
    }
    return item ?? widget.initialDestination;
  }

  void _share() {
    final name = _destination?.name ?? widget.slug;
    final country = _destination?.country ?? '';
    Share.share(
      '${tr('Khám phá điểm du lịch tuyệt đẹp', 'Discover amazing destination')}: $name ($country) ${tr('trên ứng dụng StayZ!', 'on StayZ app!')}',
    );
  }

  void _toggleFavorite() {
    setState(() {
      _isFavorite = !_isFavorite;
    });
    StayzAlert.show(
      context,
      type: _isFavorite ? StayzAlertType.success : StayzAlertType.info,
      message: _isFavorite
          ? tr('Đã lưu điểm du lịch vào yêu thích.', 'Saved destination.')
          : tr('Đã bỏ khỏi yêu thích.', 'Removed from saved.'),
    );
  }

  @override
  Widget build(BuildContext context) {
    final responsive = HomeResponsive.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final coverHeight = 320 * responsive.scale;

    return Scaffold(
      body: FutureBuilder<DestinationModel?>(
        future: _future,
        initialData: widget.initialDestination,
        builder: (context, snapshot) {
          final dest = snapshot.data ?? _destination;

          if (snapshot.connectionState == ConnectionState.waiting && dest == null) {
            return const Center(child: CircularProgressIndicator.adaptive());
          }

          if (dest == null) {
            return Scaffold(
              appBar: AppBar(title: Text(tr('Nơi du lịch', 'Destination'))),
              body: StayzErrorView(
                error: Exception(
                  tr(
                    'Không thể tải thông tin điểm du lịch.',
                    'Could not load destination details.',
                  ),
                ),
                onRetry: () => setState(() {
                  _future = _load();
                }),
              ),
            );
          }

          return CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // Parallax Header with Glassmorphism Actions
              SliverAppBar(
                expandedHeight: coverHeight,
                pinned: true,
                stretch: true,
                elevation: 0,
                backgroundColor: Theme.of(context).scaffoldBackgroundColor,
                leading: Padding(
                  padding: const EdgeInsets.all(8),
                  child: _GlassIconButton(
                    icon: Icons.chevron_left_rounded,
                    onTap: () => Navigator.of(context).pop(),
                  ),
                ),
                actions: [
                  _GlassIconButton(
                    icon: Icons.share_outlined,
                    onTap: _share,
                  ),
                  const SizedBox(width: 8),
                  _GlassIconButton(
                    icon: _isFavorite
                        ? Icons.favorite_rounded
                        : Icons.favorite_border_rounded,
                    iconColor: _isFavorite ? const Color(0xFFEF4444) : Colors.white,
                    onTap: _toggleFavorite,
                  ),
                  const SizedBox(width: 12),
                ],
                flexibleSpace: FlexibleSpaceBar(
                  background: Stack(
                    fit: StackFit.expand,
                    children: [
                      // Cover Image
                      StayZNetworkImage(
                        imageUrl: dest.coverImageUrl,
                        width: double.infinity,
                        height: coverHeight,
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
                                Colors.black.withValues(alpha: 0.45),
                                Colors.transparent,
                                Colors.black.withValues(alpha: 0.85),
                              ],
                              stops: const [0.0, 0.4, 1.0],
                            ),
                          ),
                        ),
                      ),

                      // Destination Name & Rating Tag on Cover
                      Positioned(
                        bottom: 24 * responsive.scale,
                        left: 16 * responsive.widthScale,
                        right: 16 * responsive.widthScale,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 10 * responsive.widthScale,
                                    vertical: 4 * responsive.scale,
                                  ),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFA16207),
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
                                      const SizedBox(width: 4),
                                      Text(
                                        '${dest.rating.toStringAsFixed(1)} (${dest.reviewCount} ${tr('đánh giá', 'reviews')})',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 12 * responsive.scale,
                                          fontWeight: FontWeight.w800,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Container(
                                  padding: EdgeInsets.symmetric(
                                    horizontal: 10 * responsive.widthScale,
                                    vertical: 4 * responsive.scale,
                                  ),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.25),
                                    borderRadius: BorderRadius.circular(999),
                                  ),
                                  child: Text(
                                    dest.isDomestic
                                        ? tr('Trong nước', 'Domestic')
                                        : dest.country,
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 11 * responsive.scale,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 8 * responsive.scale),
                            Text(
                              dest.name,
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 28 * responsive.scale,
                                fontWeight: FontWeight.w900,
                                height: 1.1,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Description & Tab Header Section
              SliverToBoxAdapter(
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardColor,
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(28),
                    ),
                  ),
                  padding: EdgeInsets.fromLTRB(
                    responsive.horizontalPadding,
                    20 * responsive.scale,
                    responsive.horizontalPadding,
                    0,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        dest.description,
                        style: TextStyle(
                          fontSize: 14 * responsive.scale,
                          color: Theme.of(context).colorScheme.onSurface,
                          height: 1.45,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      SizedBox(height: 20 * responsive.scale),

                      // TabBar Switcher: [Hotels] [Foods] [Activities]
                      Container(
                        height: 48 * responsive.scale,
                        decoration: BoxDecoration(
                          color: isDark
                              ? const Color(0xFF1E2D47)
                              : const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: TabBar(
                          controller: _tabController,
                          indicator: BoxDecoration(
                            color: Theme.of(context).colorScheme.primary,
                            borderRadius: BorderRadius.circular(999),
                            boxShadow: [
                              BoxShadow(
                                color: Theme.of(context)
                                    .colorScheme
                                    .primary
                                    .withValues(alpha: 0.35),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          labelColor: Colors.white,
                          unselectedLabelColor:
                              Theme.of(context).colorScheme.secondary,
                          labelStyle: TextStyle(
                            fontSize: 13 * responsive.scale,
                            fontWeight: FontWeight.w800,
                          ),
                          unselectedLabelStyle: TextStyle(
                            fontSize: 13 * responsive.scale,
                            fontWeight: FontWeight.w700,
                          ),
                          tabs: [
                            Tab(
                              text:
                                  '${tr('Khách sạn', 'Hotels')} (${dest.properties.length})',
                            ),
                            Tab(
                              text:
                                  '${tr('Ẩm thực', 'Foods')} (${dest.foods.length})',
                            ),
                            Tab(
                              text:
                                  '${tr('Trải nghiệm', 'Activities')} (${dest.activities.length})',
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 16 * responsive.scale),
                    ],
                  ),
                ),
              ),

              // Tab View Contents
              SliverPadding(
                padding: EdgeInsets.fromLTRB(
                  responsive.horizontalPadding,
                  0,
                  responsive.horizontalPadding,
                  30 * responsive.scale,
                ),
                sliver: SliverToBoxAdapter(
                  child: AnimatedBuilder(
                    animation: _tabController,
                    builder: (context, _) {
                      final index = _tabController.index;
                      if (index == 0) {
                        return _buildHotelsTab(dest, responsive);
                      } else if (index == 1) {
                        return _buildFoodsTab(dest, responsive);
                      } else {
                        return _buildActivitiesTab(dest, responsive);
                      }
                    },
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHotelsTab(DestinationModel dest, HomeResponsive responsive) {
    if (dest.properties.isEmpty) {
      return StayzEmptyView(
        icon: Icons.hotel_outlined,
        title: tr('Chưa có khách sạn nào', 'No hotels yet'),
        message: tr(
          'Chưa có dữ liệu khách sạn tại địa điểm này.',
          'No hotel data available for this destination.',
        ),
        compact: true,
      );
    }

    return Column(
      children: dest.properties.asMap().entries.map((entry) {
        final i = entry.key;
        final summary = entry.value;
        return Padding(
          padding: EdgeInsets.only(bottom: 14 * responsive.scale),
          child: HotelCard(
            fullWidth: true,
            name: summary.hotel.name,
            location: '${summary.city.name}, ${summary.city.region}',
            price: summary.hasPrice
                ? '${StayzFormatters.compactVnd(summary.lowestPrice)}${tr(' / đêm', ' / night')}'
                : tr('Chưa có phòng', 'No rooms'),
            imageUrl: summary.hotel.imageUrls.firstOrNull,
            rating: summary.rating,
            reviewCount: summary.reviewCount,
            colors: _destinationHotelColors[i % _destinationHotelColors.length],
            onTap: () => Navigator.of(context).pushNamed(
              AppRoutes.hotelDetail,
              arguments: summary,
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildFoodsTab(DestinationModel dest, HomeResponsive responsive) {
    if (dest.foods.isEmpty) {
      return StayzEmptyView(
        icon: Icons.restaurant_outlined,
        title: tr('Chưa có đặc sản nào', 'No food data'),
        message: tr(
          'Dữ liệu ẩm thực địa phương đang được cập nhật.',
          'Local food data is being updated.',
        ),
        compact: true,
      );
    }

    return Column(
      children: dest.foods.map((food) => FoodCard(food: food)).toList(),
    );
  }

  Widget _buildActivitiesTab(DestinationModel dest, HomeResponsive responsive) {
    if (dest.activities.isEmpty) {
      return StayzEmptyView(
        icon: Icons.explore_outlined,
        title: tr('Chưa có trải nghiệm nào', 'No activity data'),
        message: tr(
          'Dữ liệu cảnh quan & trải nghiệm đang được cập nhật.',
          'Sightseeing & activity data is being updated.',
        ),
        compact: true,
      );
    }

    return Column(
      children: dest.activities
          .map((activity) => ActivityCard(activity: activity))
          .toList(),
    );
  }
}

class _GlassIconButton extends StatelessWidget {
  const _GlassIconButton({
    required this.icon,
    required this.onTap,
    this.iconColor = Colors.white,
  });

  final IconData icon;
  final VoidCallback onTap;
  final Color iconColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.45),
        shape: BoxShape.circle,
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.25),
        ),
      ),
      child: IconButton(
        icon: Icon(icon, color: iconColor, size: 20),
        onPressed: onTap,
      ),
    );
  }
}

const _destinationHotelColors = [
  [Color(0xFFEAF7FF), Color(0xFF1D8BD1)],
  [Color(0xFFDDEEFF), Color(0xFF0A4E83)],
  [Color(0xFFF8FCFF), Color(0xFF3A95D8)],
  [Color(0xFFC6E4F7), Color(0xFF2378C9)],
  [Color(0xFFE0F0FB), Color(0xFF135D95)],
];
