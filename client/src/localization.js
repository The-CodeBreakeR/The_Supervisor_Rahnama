import LocalizedStrings from 'react-localization'

const Strings = new LocalizedStrings({
  per: {
    registration: 'ثبت نام',
    studentId: 'شماره‌ی دانشجویی',
    password: 'کلمه‌ی عبور',
    confirmPassword: 'تایید کلمه‌ی عبور',
    firstName: 'نام',
    lastName: 'نام خانوادگی',
    iAgreeWithRules: 'با قوانین سیستم راهنما موافقم',
    successfullyRegistered: 'ثبت نام شما با موفقیت انجام شد.',
    cancel: 'لغو',
    finish: 'پایان',
    studentIdError: 'شماره‌ی دانشجویی باید متشکل از ارقام باشد و حداقل ۸ کاراکتر باشد.',
    passwordError: 'کلمه‌ی عبور باید حداقل ۶ کاراکتر باشد.',
    confirmPasswordError: 'تایید کلمه‌ی عبور صحیح نیست.',
    nameError: 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.',
    rulesError: 'برای عضویت در سیستم شما باید قوانین را قبول کنید.',
    studentIdAlreadyExists: 'کاربری با این شماره‌ی دانشجویی از قبل وجود دارد.',
    loginToSystem: 'ورود به سیستم',
    login: 'ورود',
    wrongStudentIdOrPassword: 'شماره‌ی دانشجویی یا کلمه‌ی عبور صحیح نیست.',
    welcomeDear: 'گرامی، خوش آمدید!',
    user: 'کاربر',
    logout: 'خروج',
    search: 'جستجو',
    tourName: 'نام تور',
    noTourFound: 'توری پیدا نشد.',
    error: 'خطا',
    tourId: 'کد تور',
    startDate: 'شروع تور',
    endDate: 'پایان تور',
    tourPrice: 'قیمت',
  },
})

export default Strings
