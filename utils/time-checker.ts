export default function getTimeDifference(createdAt: string) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const timeDifferenceInSeconds = Math.floor((Number(currentDate) - Number(createdDate)) / 1000);

  // 2분 미만
  if (timeDifferenceInSeconds < 120) {
    return '1 minute ago';
  }

  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);

  // 59분 이하는 "OO minutes ago"
  if (timeDifferenceInMinutes <= 59) {
    return `${timeDifferenceInMinutes} minutes ago`;
  }

  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);

  // 60분 이상은 "1 hour ago"
  if (timeDifferenceInHours === 1) {
    return '1 hour ago';
  }

  // 23시간 이하는 "OO hours ago"
  if (timeDifferenceInHours <= 23) {
    return `${timeDifferenceInHours} hours ago`;
  }

  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  // 24시간 이상은 "1 day ago"
  if (timeDifferenceInDays === 1) {
    return '1 day ago';
  }

  // 30일 이하는 "OO days ago"
  if (timeDifferenceInDays <= 30) {
    return `${timeDifferenceInDays} days ago`;
  }

  const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);

  // 31일 이상은 "1 month ago"
  if (timeDifferenceInMonths === 1) {
    return '1 month ago';
  }

  // 11달 이하는 "OO months ago"
  if (timeDifferenceInMonths <= 11) {
    return `${timeDifferenceInMonths} months ago`;
  }

  const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12);

  // 12달 이상은 "1 year ago"
  if (timeDifferenceInYears === 1) {
    return '1 year ago';
  }

  // OO달 이상은 "{OO/12(소수점 버린 정수)} years ago"
  return `${timeDifferenceInYears} years ago`;
}
