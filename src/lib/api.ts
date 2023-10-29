import info from './data/info.json';

export const getInfo = () => {
  return info;
};

let data = {};

/**
- guest
- cover_url

- wishes
  - name
  - address
  - wish
- guest_book
  - name
  - attendance_status: present (hadir), absent (tidak hadir), late (terlambat), excused (izin)
- love_stories
- soundtrack_url
- bottom_tab_navigation (scroll)
- event_countdown_timer
- photo_albums
- video
- background_color
- location_qrcode
- add_to_calendar

Section
- Surah
- Spouse
- Event
- Gift
- Thanks
 */
