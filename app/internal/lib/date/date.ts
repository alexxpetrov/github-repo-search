export const formatIssueDate = (createdAt: string) => {
  return new Intl.DateTimeFormat('en-US').format(new Date(createdAt));
};
