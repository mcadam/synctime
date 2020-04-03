export const getDefaultConfig = () => ({
  format24Hours: false,
  seconds: true,
  workingHours: {
    before: 6,
    start: 9,
    end: 17,
    after: 21,
  },
  disableWorkingHours: false,
  onlyClocks: false,
})
