import dayjs from 'dayjs';

// ============================================
// 로케일 설정
// ============================================
import 'dayjs/locale/ko';

// ============================================
// 플러그인 등록
// ============================================
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// 기본 로케일을 한국어로 설정
dayjs.locale('ko');

export default dayjs;
