import LocalizedStrings from 'react-localization'

const Strings = new LocalizedStrings({
  per: {
    incomeTable: 'جدول درآمد ها',
    incomeInput: 'ورود درآمد جدید',
    expenseTable: 'جدول هزینه ها',
    expenseInput: 'ورود هزینه جدید',
    loanRequestInput: 'درخواست وام',
    loanResponseInput: 'پیگیری درخواست وام',
    rulesTable: 'جدول مقررات',
    placesTable: 'جدول محل های اقامتی در دسترس',
    reserveInput: 'رزرو محل اقامتی',
    NoResponse: 'به این چنین درخواستی پاسخ داده نشده است.',
    furtherTracking: 'کد رهگیری',
    repPer: 'دوره بازپرداخت:',
    repRate: 'نرخ بازپرداخت:',
    requestCode: 'کد رهگیری',
    viewResult: 'مشاهده نتیجه',
    requestOK: 'درخواست شما با موفقیت ثبت شد. برای پیگیری درخواست خود از کد رهگیری زیر استفاده کنید:\n',
    submitRequest: 'ثبت درخواست وام',
    requestPurpose: 'مورد استفاده ی وام',
    requestAmount: 'مقدار درخواستی (تومان)‌',
    submitionOK: 'فرآیند با موفقیت به انجام رسید.',
    submitionFailed: 'فرآیند با خطا مواجه شد. لطفا از درستی ورودی های خود اطمینان حاصل نمایید.',
    loginFirst: ' لطفا ابتدا وارد حساب کاربری خود شوید.',
    submitExpense: 'ثبت هزینه جدید',
    submitIncome: 'ثبت درآمد جدید',
    expenseID: 'کد هزینه',
    expenseDestination: 'منبع هزینه',
    expenseAmount: 'مقدار هزینه (تومان)',
    incomeID: 'کد درآمد',
    incomeSource: 'منبع درآمد',
    incomeAmount: 'مقدار درآمد (تومان)',
    reservePlace: 'رزرو',
    placeID: 'کد‌ محل اقامتی',
    placeSize: 'متراژ',
    placeType: 'نوع',
    placeLocation: 'آدرس',
    placeCost: 'هزینه سالیانه (‌تومان)',
    placeReserveFailed: 'رزرو با خطا مواجه شد. لطفا کد معتبر محل اقامتی را وارد کنید.',
    placeReserveOK: 'رزرو شما با موفقیت انجام شد.',
    ruleID: 'شماره',
    ruleDate: 'تاریخ تصویب',
    ruleDescription: 'توضیحات',
    rahnamaSystem: 'سامانه‌ی راهنما',
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
    tourPrice: 'قیمت(هزار تومان)',
    requestForTour: 'درخواست برای تور',
    requestForTourSpec: 'مشخصات تور پیشنهادی خود را بنویسید',
    submit: 'ثبت',
    requestSubmitAccept: 'درخواست شما با موفقیت ثبت شد.',
    requestSubmitDecline: 'درخواست شما با موفقیت ثبت نشد.',
    moreInfo: 'برای اطلاعات بیشتر کلیک کنید.',
    forMoreInfo: 'اطلاعات بیشتر',
    tourInfo: 'اطلاعات تور',
    info: 'توضیحات',
    tourCapacity: 'ظرفیت تور',
    tourReserve: 'رزرو',
    tourPayment: 'پرداخت هزینه',
    tourCansel: 'لغو رزرو',
    tourAccepted: 'تایید',
    waitPlease: 'لطفا صبر کنید...',
    noCapacityTour: 'متاسفانه ظرفیت تور پر میباشد',
    haveNotRegister: 'برای انجام این فرآیند در سایت عضو شوید',
    tourBankCode: 'لطفا کد فیش پرداخت خود را وارد نمایید..',
    errorPayment: 'فیش بانکی وارد شده غلط میباشد',
    tourStop: 'بستن',
    seeCodingSkill: 'مشاهده مهارت کد نویسی',
    skill: ' توضیحات مهارت',
    seePresentationSkill: 'مشاهده مهارت ارایه مطالب',
    seeFastReadSkill: 'مشاهده مهارت تند خوانی',
    seeTypeSkill: 'مشاهده مهارت تایپ',
    askSkillQuestion: 'پرسش سوال',
    askSkillQuestionSpec: 'متن سوال خود را بنویسید...',
    forReserveRegister: 'برای انجام عملیات رزو در سایت عضو شوید',
    toursComment: 'نظرات در مورد تور:',
    writeYourCommentTour: 'نظر خود را در مورد تور بنویسید...',
    answerAndQuestionArchive: 'آرشیو سوالات و جوابات',
    questionShow: 'پرسش :',
    answerShow: 'جواب :',
    noQuestion: 'ارشیوی شما خالی میباشد',
  },
})

export default Strings
