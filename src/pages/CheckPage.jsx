import { Input, Skeleton } from "antd";
import { useGetSingleVisaQuery } from "../redux/api/visa/visaApi";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import pdfHeader from '../assets/pdfHeader.png'

const CheckPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const unikal_numb_query = searchParams.get("unikal_numb");
  const { data: visaData, isLoading: isLoadingVisa } =
    useGetSingleVisaQuery(unikal_numb_query);

  const printContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    // evisa.e-gov.kg_printStatus.php_lng=en&unikal_numb=70126357
    documentTitle: `evisa.e-gov.kg_printStatus.php_lng=en&unikal_numb=${visaData?.data?.referenceNumber}`,
    // onBeforePrint: () => {console.log("before printing...");},
    // onAfterPrint: () => {console.log("after printing...");},
    removeAfterPrint: false,
  });

  return (
    <div className="py-6 pt-10">
      <div className="px-2 md:my-container">
        {isLoadingVisa ? (
          <div className="">
            <Skeleton.Button active className="!h-[550px] !w-full" />
          </div>
        ) : (
          <>
            {/* Data */}
            <div className="w-full md:w-5/6 xl:w-3/6 mx-auto text-center space-y-6 md:space-y-8">
              <h2 className="font-bold text-white text-2xl  md:text-4xl">
                APPLICATION STATUS
              </h2>

              <div className="space-y-2 w-full">
                {/* visa application and name */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Visa application status:
                    </p>
                    <Input
                      value={visaData?.data?.visaApplicationStatus}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Name:
                    </p>
                    <Input
                      value={visaData?.data?.name}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                {/* Date of application and surname */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Date of your application status is:
                    </p>
                    <Input
                      value={visaData?.data?.applicationStatusDate}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Surname:
                    </p>
                    <Input
                      value={visaData?.data?.surname}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                {/* ref num and middle name */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Reference number:
                    </p>
                    <Input
                      value={visaData?.data?.referenceNumber}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Middle Name or Patronymic:
                    </p>
                    <Input
                      value={visaData?.data?.middleNameOrPatronymic}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                {/* passport county and birth date */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Passport country:
                    </p>
                    <Input
                      value={visaData?.data?.passportCountry}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Birth Date:
                    </p>
                    <Input
                      value={visaData?.data?.birthDate}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Passport type:
                    </p>
                    <Input
                      value={visaData?.data?.passportType}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Visa type:
                    </p>
                    <Input
                      value={visaData?.data?.visaType}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                {/* passport number and visa duration */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Passport number:
                    </p>
                    <Input
                      value={visaData?.data?.passportNumber}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Visa duration:
                    </p>
                    <Input
                      value={visaData?.data?.visaDuration}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                {/* issue date and entry times */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Issue date of passport
                    </p>
                    <Input
                      value={visaData?.data?.passportIssueDate}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Entry times:
                    </p>
                    <Input
                      value={visaData?.data?.entryTimes}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>

                {/* expiration and visa validity */}
                <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Expiration date of passport:
                    </p>
                    <Input
                      value={visaData?.data?.passportExpirationDate}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-slate-100 text-nowrap text-[8px] md:text-[14px] lg:text-[16px]">
                      Visa validity period:
                    </p>
                    <Input
                      value={visaData?.data?.visaValidityPeriod}
                      className="bg-[#c2c2c2] pointer-events-none !rounded-sm !h-[34px] !font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center mt-4">
              <button
                type="submit"
                onClick={() => {
                  handlePrint();
                }}
                className="my-3 bg-slate-800 font-bold text-primary-1 border border-white hover:bg-primary-1 hover:primary-1 hover:text-white p-2 !px-8 rounded-md shadow-md"
              >
                Print
              </button>
              <button
                type="submit"
                onClick={() => {
                  handlePrint();
                }}
                className="my-3 bg-slate-800 font-bold text-primary-1 border border-white hover:bg-primary-1 hover:primary-1 hover:text-white p-2 !px-8 rounded-md shadow-md"
              >
                Preview
              </button>
            </div>
          </>
        )}
      </div>

      {/* Component to be print */}
      <div
        className={`font-bold bg-white min-h-screen text-black text-center print-content-serif}`}
        id="printContent"
        ref={printContentRef}
      >
        <div className="mx-[60px] py-8 space-y-7">
          {/* Header */}
          {/* <div className="flex gap-10 border-b-2 border-black pb-1">
            <img
              src={"https://i.ibb.co/zrtZGzy/Emblem-of-Kyrgyzstan-svg.png"}
              alt={"e-VISA"}
              className="h-[80px] w-[80px] rounded-full shadow-md opacity-85"
            />
            <div className="space-y-2 text-center">
              <h2 className="font-bold text-xl print-content-serif">
                КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ТЫШКЫ ИШТЕР <br /> МИНИСТРЛИГИ
              </h2>
              <h2 className="font-bold text-xl print-content-serif">
                MINISTRY OF FOREIGN AFFAIRS OF THE KYRGYZ <br /> REPUBLIC
              </h2>
              <p className="font-semibold text-xl print-content-serif">
                Электрондук виза – «E-visa»
              </p>
            </div>
          </div> */}
          <img src={pdfHeader} alt="" />

     <div className="px-[13px]">
           {/* img and qr code */}
           <div className="flex gap-2 justify-between">
            <img
              src={visaData?.data?.userImg}
              alt={visaData?.data?.name}
              className="h-28 w-[95px] shadow-md pt-[5px]"
            />

            <div className="space-y-1 text-right font-normal">
              <p className="print-content-serif">
                Визанын номери/visa number: {visaData?.data?.referenceNumber}
              </p>
              <img
                src={visaData?.data?.userQrCodeImg}
                alt="qr code"
                className="w-[75px] shadow-md ml-auto"
              />
            </div>
          </div>

          {/* visa data*/}
          <div className="relative overflow-x-auto mb-6 mt-2 text-slate-800 font-normal space-y-[2px] !text-left">
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">Толук аты-жөнү/Full name:</p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">{visaData?.data?.name} {visaData?.data?.surname}</h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">
                Туулган датасы/Date of birth:
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.birthDate}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">Жарандыгы/Citizenship:</p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">Bangladesh</h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between items-end">
              <p className="print-content-serif">
                Жол жүрүүчү документтин (паспорттун) номери / Number <br /> of
                Travel document (passport):
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.passportNumber}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">
                Жол жүрүүчү документтин түрү/Type of travel document:
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.passportType}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between items-end">
              <p className="print-content-serif">
                Жол жүрүүчү документтин (паспорттун) берилген датасы/ DATE of{" "}
                <br /> issue of the travelling document (passport):
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.passportIssueDate}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between items-end">
              <p className="print-content-serif">
                Жол жүрүүчү документтин (паспорттун) бүткөн датасы/ Date of{" "}
                <br /> expiry of the travelling document (passport):
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.passportExpirationDate}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">Визанын түрү/Type of visa:</p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.visaType}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">
                Визанын колдонулуу мөөнөтү/Validity of visa:
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.visaValidityPeriod}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">
                Кирүүлөрдүн саны/Number of entries:
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.entryTimes}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">
                Жүрүү мөөнөтү/Period of stay(days):
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.visaDuration}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">Чакыруучу/Invitation:</p>
              <h2 className="print-content-serif"></h2>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="print-content-serif">
                Визанын берилген датасы/Date of visa:
              </p>
              <div className="w-[160px]">
                <h2 className="print-content-serif">
                  {visaData?.data?.applicationStatusDate}
                </h2>
              </div>
            </div>
          </div>

          <h3 className="!font-bold text-black text-center print-content-serif">
            Validity period of a visa is generally longer than period of stay.
            The validity period establishes the ﬁrst and last dates during which
            the visa can be used. Period of stay indicates the length of time
            you have permission to remain in Kyrgyzstan within the validity
            period of the visa.
          </h3>
     </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPage;
