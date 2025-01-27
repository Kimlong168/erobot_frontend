import Link from "next/link";
import convertToPhoneNumber from "@/utils/convertToPhoneNumber";
import checkSocialMedia from "@/utils/checkSocialMedia";
import StatusColor from "@/components/ui/StatusColor";
import Image from "next/image";

const OrderDetailCard = ({
  orderId,
  fullName,
  phoneNumber,
  contactLink,
  address,
  message,
  cartItems,
  total,
  status,
  date,
  paymentMethod,
}) => {
  return (
    <div
      className="border bg-card text-card-foreground w-full max-w-3xl min-w-[100%] mx-auto shadow-xl"
      data-v0-t="card"
    >
      <div className="w-full overflow-x-auto">
        <div className="p-6 pt-4 grid gap-4 ">
          <div
            className={`flex flex-col space-y-1.5 pb-0  overflow-auto`}
            id="orderHistory"
          >
            {/* header title */}

            <>
              <h3 className="text-xl md:text-2xl mt-2 font-semibold break-all">
                Order ID:
                {orderId}
              </h3>
              <p className="text-sm text-muted-foreground">Order Details</p>
            </>
          </div>
          <div className="grid sm:grid-cols-2  gap-4 relative">
            <div className="flex flex-col gap-1">
              {/* order date */}
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                Order Date
              </label>
              <p className="font-medium">{date}</p>
            </div>

            <div>
              {/* status */}
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                Status
              </label>
              <p className="mt-0.5">
                <StatusColor status={status} />
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {/* fullname */}
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                Customer
              </label>

              <p className="font-medium">{fullName}</p>
            </div>

            <div className="flex flex-col gap-1">
              {/* phone number */}
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                Phone Number
              </label>
              <p className="font-medium  hover:text-blue-600">
                <Link href={`tel:${phoneNumber}`}>
                  {phoneNumber && convertToPhoneNumber(phoneNumber)}
                </Link>
              </p>
            </div>

            {/*paymentMethod */}
            {paymentMethod && (
              <div className="flex flex-col gap-1">
                <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                  Payment Method
                </label>
                <p className="font-medium  uppercase">{paymentMethod}</p>
              </div>
            )}

            {/* contact link */}
            <div className="flex flex-col gap-1">
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                {checkSocialMedia(contactLink)}
              </label>
              <p className="font-medium">
                {contactLink ? (
                  <Link
                    className=" text-blue-500 hover:text-blue-600"
                    href={contactLink}
                  >
                    {contactLink}
                  </Link>
                ) : (
                  "No link"
                )}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {/* address */}
              <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                Address
              </label>
              <p className="font-medium">{address}</p>
            </div>
            {message && (
              <div className="flex flex-col gap-1">
                {/* message */}
                <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                  Customer Remark:
                </label>
                <p className="font-medium">{message}</p>
              </div>
            )}
          </div>
          <div className="grid gap-4">
            <div className="border">
              <div className="relative w-full">
                {/* invoice table */}
                <table className="w-full caption-bottom text-sm">
                  {/* table header */}
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[80px] hidden md:table-cell">
                        Image
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 max-w-[150px]">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        <span className="hidden sm:block"> Quantity</span>
                        <span className="sm:hidden"> Qty</span>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Price
                      </th>
                    </tr>
                  </thead>

                  {/* table body */}
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    {cartItems &&
                      cartItems.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          {/* image */}
                          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                            <Image
                              src={item.image}
                              width={64}
                              height={64}
                              alt="Product image"
                              className="aspect-square rounded-md object-cover h-[64px] w-[64px]"
                            />
                          </td>
                          {/* product name */}
                          <td
                            className={`p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium`}
                          >
                            {item.name}
                          </td>
                          {/* quantity */}
                          <td
                            className={`p-4 align-middle [&amp;:has([role=checkbox])]:pr-0`}
                          >
                            {item.quantity}
                          </td>
                          {/* price */}
                          <td
                            className={`p-4 align-middle [&amp;:has([role=checkbox])]:pr-0`}
                          >
                            {item.price} $
                          </td>
                        </tr>
                      ))}

                    {/* total price */}
                    <tr>
                      <td className="hidden md:block"></td>
                      <td
                        colSpan={2}
                        className="p-4 align-middle text-right font-bold"
                      >
                        Total
                      </td>
                      <td className="p-4 align-middle font-medium truncate">
                        {total} $
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
