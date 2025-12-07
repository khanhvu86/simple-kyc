import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  useUpdateUserProfileMutation,
  useUserProfileByUserIdQuery,
} from '../../hooks/user-profile';
import {
  addressTypes,
  documentTypes,
  emailPreferred,
  emailTypes,
  phonePreferred,
  phoneTypes,
  assetsTypes,
  incomeTypes,
  liabilityTypes,
  marketsExperience,
  riskToleranceNumber,
  wealthSourceTypes,
} from './options';
import Button from '../../components/button';
import Input from '../../components/input';
import Select from '../../components/select';
import { USER_PROFILE_STATUS } from '../../constant/user';
import { X } from 'lucide-react';

const defaultUserProfileData = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  age: 0,
  addresses: [
    {
      country: '',
      city: '',
      street: '',
      postalCode: 0,
      type: 0,
    },
  ],
  emails: [
    {
      email: '',
      type: 0,
      preferred: false,
    },
  ],
  phones: [
    {
      phone: '',
      type: 0,
      preferred: false,
    },
  ],
  documents: [
    {
      type: 0,
      expiryDate: '',
    },
  ],
  occupations: [
    {
      occupation: '',
      fromDate: '',
      toDate: '',
    },
  ],
  incomes: [
    {
      type: 0,
      amount: 0,
    },
  ],
  assets: [
    {
      type: 0,
      amount: 0,
    },
  ],
  liabilities: [
    {
      type: 0,
      amount: 0,
    },
  ],
  wealthSources: [
    {
      type: 0,
      amount: 0,
    },
  ],
  total: 0,
  experience: 0,
  riskTolerance: 0,
};

const KYC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm(defaultUserProfileData);

  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: 'addresses',
  });

  const { fields: emailFields, append: appendEmail } = useFieldArray({
    control,
    name: 'emails',
  });

  const { fields: phoneFields, append: appendPhone } = useFieldArray({
    control,
    name: 'phones',
  });

  const { fields: documentFields, append: appendDocument } = useFieldArray({
    control,
    name: 'documents',
  });

  const { fields: occupationFields, append: appendOccupation } = useFieldArray({
    control,
    name: 'occupations',
  });

  const { fields: incomeFields, append: appendIncome } = useFieldArray({
    control,
    name: 'incomes',
  });

  const { fields: assetFields, append: appendAsset } = useFieldArray({
    control,
    name: 'assets',
  });

  const { fields: liabilityFields, append: appendLiability } = useFieldArray({
    control,
    name: 'liabilities',
  });

  const { fields: wealthSourceFields, append: appendWealthSource } =
    useFieldArray({
      control,
      name: 'wealthSources',
    });

  const { data } = useUserProfileByUserIdQuery('udP6zDJ');

  const { mutateAsync: updateUserProfile, isPending } =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (data?.data[0]) {
      reset(data.data[0]);
    }
  }, [data, reset]);

  const onSubmit = async (data) => {
    data.submitDate = new Date().toLocaleDateString();
    data.status = USER_PROFILE_STATUS.PENDING;
    await updateUserProfile({ id: '0Y_F3Tk', data });
  };

  const handleAddAddress = () => {
    appendAddress({
      country: '',
      city: '',
      street: '',
      postalCode: '',
      type: 0,
    });
  };

  const handleAddEmail = () => {
    appendEmail({
      email: '',
      type: 0,
      preferred: true,
    });
  };

  const handleAddPhone = () => {
    appendPhone({
      phone: '',
      type: 0,
      preferred: true,
    });
  };

  const handleAddDocument = () => {
    appendDocument({
      type: 0,
      expiryDate: '',
    });
  };

  const handleAddOccupation = () => {
    appendOccupation({
      occupation: '',
      fromDate: '',
      toDate: '',
    });
  };

  const handleAddIncome = () => {
    appendIncome({
      type: 0,
      amount: 0,
    });
  };

  const handleAddAsset = () => {
    appendAsset({
      type: 0,
      amount: 0,
    });
  };

  const handleAddLiability = () => {
    appendLiability({
      type: 0,
      amount: 0,
    });
  };

  const handleAddWealthSource = () => {
    appendWealthSource({
      type: 0,
      amount: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: 'var(--primary-color)' }}
      >
        Financial Status
      </h2>
      <form
        className="mt-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Basic Information Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First name"
              placeholder="Enter your first name"
              required={true}
              error={errors.firstName?.message}
              {...register('firstName', { required: 'First name is required' })}
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              required={true}
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Last name is required' })}
            />
            <Input
              label="Middle Name"
              placeholder="Enter your middle name"
              {...register('middleName')}
            />
            <Input
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              required={true}
              {...register('dateOfBirth', {
                required: 'Date of birth is required',
              })}
            />
            <Input
              label="Age"
              placeholder="Enter your age"
              type="number"
              {...register('age')}
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Contact Information
          </h3>
          {/* Addresses Panel */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-8">Addresses</h4>
            {addressFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="panel rounded-md p-6 mb-8 shadow-md relative"
                >
                  <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                    <span className="font-medium">Address #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Country"
                      placeholder="Enter country"
                      required={true}
                      error={errors.addresses?.[index]?.country?.message}
                      {...register(`addresses.${index}.country`, {
                        required: 'Country is required',
                      })}
                    />
                    <Input
                      label="City"
                      placeholder="Enter city"
                      required={true}
                      error={errors.addresses?.[index]?.city?.message}
                      {...register(`addresses.${index}.city`, {
                        required: 'City is required',
                      })}
                    />
                    <Input
                      label="Street"
                      placeholder="Enter street"
                      required={true}
                      error={errors.addresses?.[index]?.street?.message}
                      {...register(`addresses.${index}.street`, {
                        required: 'Street is required',
                      })}
                    />
                    <Input
                      label="Postal Code"
                      placeholder="Enter postal code"
                      error={errors.addresses?.[index]?.postalCode?.message}
                      {...register(`addresses.${index}.postalCode`)}
                    />
                    <Select
                      label="Type"
                      options={addressTypes}
                      required={true}
                      error={errors.addresses?.[index]?.type?.message}
                      {...register(`addresses.${index}.type`, {
                        required: 'Address type is required',
                      })}
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddAddress}>Add Address</Button>
          </div>
          {/* Emails Panel */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-8">Emails</h4>
            {emailFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="panel rounded-md p-6 mb-8 shadow-md relative"
                >
                  <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                    <span className="font-medium">Email #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Email Address"
                      placeholder="Enter email address"
                      type="email"
                      required={true}
                      error={errors.emails?.[index]?.email?.message}
                      {...register(`emails.${index}.email`, {
                        required: 'Email is required',
                      })}
                    />
                    <Select
                      label="Type"
                      options={emailTypes}
                      required={true}
                      error={errors.emails?.[index]?.type?.message}
                      {...register(`emails.${index}.type`, {
                        required: 'Email type is required',
                      })}
                    />
                    <Select
                      label="Preferred"
                      options={emailPreferred}
                      required={true}
                      error={errors.emails?.[index]?.preferred?.message}
                      {...register(`emails.${index}.preferred`, {
                        setValueAs: (value) =>
                          value === 'true' || value === true,
                      })}
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddEmail}>Add Email</Button>
          </div>
          {/* Phones Panel  */}
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-8">Phones</h4>
            {phoneFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="panel rounded-md p-6 mb-8 shadow-md relative"
                >
                  <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                    <span className="font-medium">Phone #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Phone Number"
                      placeholder="Enter phone number"
                      type="tel"
                      required={true}
                      error={errors.phones?.[index]?.phone?.message}
                      {...register(`phones.${index}.phone`, {
                        required: 'Phone number is required',
                      })}
                    />
                    <Select
                      label="Type"
                      options={phoneTypes}
                      required={true}
                      error={errors.phones?.[index]?.type?.message}
                      {...register(`phones.${index}.type`, {
                        required: 'Phone type is required',
                      })}
                    />
                    <Select
                      label="Preferred"
                      options={phonePreferred}
                      required={true}
                      error={errors.phones?.[index]?.preferred?.message}
                      {...register(`phones.${index}.preferred`, {
                        setValueAs: (value) =>
                          value === 'true' || value === true,
                      })}
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddPhone}>Add Phone</Button>
          </div>
          <div className="panel mb-6">
            <h4 className="text-md font-semibold mb-8">
              Identification Documents
            </h4>
            {documentFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="panel rounded-md p-6 mb-8 shadow-md relative"
                >
                  <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                    <span className="font-medium">Document #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Select
                      label="Type"
                      options={documentTypes}
                      required={true}
                      error={errors.documents?.[index]?.type?.message}
                      {...register(`documents.${index}.type`, {
                        required: 'Document type is required',
                      })}
                    />
                    <Input
                      label="Expiry Date"
                      type="date"
                      required={true}
                      error={errors.documents?.[index]?.expiryDate?.message}
                      {...register(`documents.${index}.expiryDate`, {
                        required: 'Expiry date is required',
                      })}
                    />
                    <Input
                      label="Uploaded Document"
                      required={true}
                      type="file"
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddDocument}>
              Add Identification Document
            </Button>
          </div>
          <div className="panel">
            <h4 className="text-md font-semibold mb-8">Occupations</h4>
            {occupationFields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="panel rounded-md p-6 mb-8 shadow-md relative"
                >
                  <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                    <span className="font-medium">Occupation #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div key={field.id} className="grid grid-cols-3 gap-4 mt-4">
                    <Input
                      label="Occupation"
                      placeholder="Enter occupation"
                      required={true}
                      error={errors.occupations?.[index]?.occupation?.message}
                      {...register(`occupations.${index}.occupation`, {
                        required: 'Occupation is required',
                      })}
                    />
                    <Input
                      label="From Date"
                      type="date"
                      required={true}
                      error={errors.occupations?.[index]?.fromDate?.message}
                      {...register(`occupations.${index}.fromDate`, {
                        required: 'From date is required',
                      })}
                    />
                    <Input
                      label="To Date"
                      type="date"
                      required={true}
                      error={errors.occupations?.[index]?.toDate?.message}
                      {...register(`occupations.${index}.toDate`, {
                        required: 'To date is required',
                      })}
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddOccupation}>Add Occupation</Button>
          </div>
        </div>

        {/* Incomes Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-8"
            style={{ color: 'var(--primary-color)' }}
          >
            Incomes (A)
          </h3>
          {incomeFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="panel rounded-md p-6 mb-8 shadow-md relative"
              >
                <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                  <span className="font-medium">Income #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Type"
                    options={incomeTypes}
                    error={errors.incomes?.[index]?.type?.message}
                    {...register(`incomes.${index}.type`, {
                      required: 'Income type is required',
                    })}
                  />
                  <Input
                    label="Amount (Currency)"
                    placeholder="Enter amount"
                    type="number"
                    error={errors.incomes?.[index]?.amount?.message}
                    {...register(`incomes.${index}.amount`, {
                      required: 'Income amount is required',
                    })}
                  />
                </div>
              </div>
            );
          })}
          <Button handleClick={handleAddIncome}>Add Income</Button>
        </div>

        {/* Assets Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-8"
            style={{ color: 'var(--primary-color)' }}
          >
            Assets (B)
          </h3>
          {assetFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="panel rounded-md p-6 mb-8 shadow-md relative"
              >
                <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                  <span className="font-medium">Asset #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Type"
                    options={assetsTypes}
                    error={errors.assets?.[index]?.type?.message}
                    {...register(`assets.${index}.type`, {
                      required: 'Asset type is required',
                    })}
                  />
                  <Input
                    label="Amount (Currency)"
                    placeholder="Enter amount"
                    type="number"
                    error={errors.assets?.[index]?.amount?.message}
                    {...register(`assets.${index}.amount`, {
                      required: 'Asset amount is required',
                    })}
                  />
                </div>
              </div>
            );
          })}
          <Button handleClick={handleAddAsset}>Add Asset</Button>
        </div>

        {/* Liabilities Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Liabilities (C)
          </h3>
          <p className="text-sm mb-8 text-gray-600">
            Liabilities are any outstanding debts or obligations you may have.
            These can include loans such as personal loans, mortgages, or other
            forms of debt.
          </p>
          {liabilityFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="panel rounded-md p-6 mb-8 shadow-md relative"
              >
                <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                  <span className="font-medium">Liability #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Select
                    label="Type"
                    options={liabilityTypes}
                    error={errors.liabilities?.[index]?.type?.message}
                    {...register(`liabilities.${index}.type`, {
                      required: 'Liability type is required',
                    })}
                  />
                  <Input
                    label="Amount (Currency)"
                    placeholder="Enter amount"
                    type="number"
                    error={errors.liabilities?.[index]?.amount?.message}
                    {...register(`liabilities.${index}.amount`, {
                      required: 'Liability amount is required',
                    })}
                  />
                  <div className="mt-4">
                    <Input
                      label="Total Liabilities"
                      placeholder="Calculated Total"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Button handleClick={handleAddLiability}>Add Liability</Button>
        </div>

        {/* Source of Wealth Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Source of Wealth (D)
          </h3>
          <p className="text-sm mb-8 text-gray-600">
            This section identifies the origin of your wealth, such as any
            inheritance or donations you may have received. It's important for
            financial transparency.
          </p>
          {wealthSourceFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="panel rounded-md p-6 mb-8 shadow-md relative"
              >
                <div className="header-panel text-sm flex items-center gap-2 absolute -top-4">
                  <span className="font-medium">
                    Wealth source #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Type"
                    options={wealthSourceTypes}
                    error={errors.wealthSources?.[index]?.type?.message}
                    {...register(`wealthSources.${index}.type`, {
                      required: 'Source of wealth type is required',
                    })}
                  />
                  <Input
                    label="Amount (Currency)"
                    placeholder="Enter amount"
                    type="number"
                    error={errors.wealthSources?.[index]?.amount?.message}
                    {...register(`wealthSources.${index}.amount`, {
                      required: 'Source of wealth amount is required',
                    })}
                  />
                  <div className="mt-4">
                    <Input
                      label="Total Source of Wealth"
                      placeholder="Calculated Total"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Button handleClick={handleAddWealthSource}>
            Add Source of Wealth
          </Button>
        </div>

        {/* Net Worth Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Net Worth
          </h3>
          <div>
            <Input
              label="Total"
              placeholder="Automatically calculated"
              {...register('total')}
            />
          </div>
        </div>

        {/* Investment Experience and Objectives Section */}
        <div className="border panel rounded-md p-4">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: 'var(--primary-color)' }}
          >
            Investment Experience and Objectives
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Experience in Financial Markets"
              options={marketsExperience}
              {...register('experience')}
            />
            <Select
              label="Type"
              options={riskToleranceNumber}
              {...register('riskTolerance')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <Button type="submit" isLoading={isPending} disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KYC;
