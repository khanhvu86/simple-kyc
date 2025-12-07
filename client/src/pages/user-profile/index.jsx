import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  useUpdateUserProfileMutation,
  useUserProfileByUserIdQuery,
} from '../../hooks/user-profile';
import {
  addressTypes,
  emailTypes,
  phoneTypes,
  documentTypes,
  emailPreferred,
  phonePreferred,
} from '../../constant/options';
import { ADMIN_URL } from '../../constant/url';
import { X } from 'lucide-react';
import Input from '../../components/input';
import Button from '../../components/button';
import Select from '../../components/select';

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

const UserProfile = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm(defaultUserProfileData);

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: 'addresses',
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phones',
  });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: 'documents',
  });

  const {
    fields: occupationFields,
    append: appendOccupation,
    remove: removeOccupation,
  } = useFieldArray({
    control,
    name: 'occupations',
  });

  const { userId } = useParams();

  const { data } = useUserProfileByUserIdQuery(userId);

  const { mutateAsync: updateUserProfile, isPending } =
    useUpdateUserProfileMutation();

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (data?.data[0]) {
      reset(data.data[0]);
    }
  }, [data, reset]);

  const onSubmit = async (data) => {
    await updateUserProfile({ id: data.id, data });
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: 'var(--primary-color)' }}
      >
        Personal Information
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
              disabled={!editMode}
              error={errors.firstName?.message}
              {...register('firstName', { required: 'First name is required' })}
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              required={true}
              disabled={!editMode}
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Last name is required' })}
            />
            <Input
              label="Middle Name"
              placeholder="Enter your middle name"
              disabled={!editMode}
              {...register('middleName')}
            />
            <Input
              label="Date of Birth"
              type="date"
              required={true}
              disabled={!editMode}
              error={errors.dateOfBirth?.message}
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
                      disabled={!editMode}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Country"
                      placeholder="Enter country"
                      required={true}
                      disabled={!editMode}
                      error={errors.addresses?.[index]?.country?.message}
                      {...register(`addresses.${index}.country`, {
                        required: 'Country is required',
                      })}
                    />
                    <Input
                      label="City"
                      placeholder="Enter city"
                      required={true}
                      disabled={!editMode}
                      error={errors.addresses?.[index]?.city?.message}
                      {...register(`addresses.${index}.city`, {
                        required: 'City is required',
                      })}
                    />
                    <Input
                      label="Street"
                      placeholder="Enter street"
                      required={true}
                      disabled={!editMode}
                      error={errors.addresses?.[index]?.street?.message}
                      {...register(`addresses.${index}.street`, {
                        required: 'Street is required',
                      })}
                    />
                    <Input
                      label="Postal Code"
                      placeholder="Enter postal code"
                      disabled={!editMode}
                      error={errors.addresses?.[index]?.postalCode?.message}
                      {...register(`addresses.${index}.postalCode`)}
                    />
                    <Select
                      label="Type"
                      options={addressTypes}
                      required={true}
                      disabled={!editMode}
                      error={errors.addresses?.[index]?.type?.message}
                      {...register(`addresses.${index}.type`, {
                        required: 'Address type is required',
                      })}
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddAddress} disabled={!editMode}>
              Add Address
            </Button>
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
                      onClick={() => removeEmail(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                      disabled={!editMode}
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
                      disabled={!editMode}
                      error={errors.emails?.[index]?.email?.message}
                      {...register(`emails.${index}.email`, {
                        required: 'Email is required',
                      })}
                    />
                    <Select
                      label="Type"
                      options={emailTypes}
                      required={true}
                      disabled={!editMode}
                      error={errors.emails?.[index]?.type?.message}
                      {...register(`emails.${index}.type`, {
                        required: 'Email type is required',
                      })}
                    />
                    <Select
                      label="Preferred"
                      options={emailPreferred}
                      required={true}
                      disabled={!editMode}
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
            <Button handleClick={handleAddEmail} disabled={!editMode}>
              Add Email
            </Button>
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
                      onClick={() => removePhone(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                      disabled={!editMode}
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
                      disabled={!editMode}
                      error={errors.phones?.[index]?.phone?.message}
                      {...register(`phones.${index}.phone`, {
                        required: 'Phone number is required',
                      })}
                    />
                    <Select
                      label="Type"
                      options={phoneTypes}
                      required={true}
                      disabled={!editMode}
                      error={errors.phones?.[index]?.type?.message}
                      {...register(`phones.${index}.type`, {
                        required: 'Phone type is required',
                      })}
                    />
                    <Select
                      label="Preferred"
                      options={phonePreferred}
                      required={true}
                      disabled={!editMode}
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
            <Button handleClick={handleAddPhone} disabled={!editMode}>
              Add Phone
            </Button>
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
                      onClick={() => removeDocument(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                      disabled={!editMode}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <Select
                      label="Type"
                      options={documentTypes}
                      required={true}
                      disabled={!editMode}
                      error={errors.documents?.[index]?.type?.message}
                      {...register(`documents.${index}.type`, {
                        required: 'Document type is required',
                      })}
                    />
                    <Input
                      label="Expiry Date"
                      type="date"
                      required={true}
                      disabled={!editMode}
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
            <Button handleClick={handleAddDocument} disabled={!editMode}>
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
                      onClick={() => removeOccupation(index)}
                      className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                      disabled={!editMode}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div key={field.id} className="grid grid-cols-3 gap-4 mt-4">
                    <Input
                      label="Occupation"
                      placeholder="Enter occupation"
                      required={true}
                      disabled={!editMode}
                      error={errors.occupations?.[index]?.occupation?.message}
                      {...register(`occupations.${index}.occupation`, {
                        required: 'Occupation is required',
                      })}
                    />
                    <Input
                      label="From Date"
                      type="date"
                      required={true}
                      disabled={!editMode}
                      error={errors.occupations?.[index]?.fromDate?.message}
                      {...register(`occupations.${index}.fromDate`, {
                        required: 'From date is required',
                      })}
                    />
                    <Input
                      label="To Date"
                      type="date"
                      required={true}
                      disabled={!editMode}
                      error={errors.occupations?.[index]?.toDate?.message}
                      {...register(`occupations.${index}.toDate`, {
                        required: 'To date is required',
                      })}
                    />
                  </div>
                </div>
              );
            })}
            <Button handleClick={handleAddOccupation} disabled={!editMode}>
              Add Occupation
            </Button>
          </div>
        </div>
        <div className="text-right flex gap-2">
          {!editMode ? (
            <Button handleClick={() => setEditMode(true)}>Edit</Button>
          ) : (
            <>
              <Button type="submit" isLoading={isPending} disabled={isPending}>
                Save
              </Button>

              <Button
                handleClick={() => {
                  reset(data.data);
                  setEditMode(false);
                }}
                type="button"
              >
                Cancel
              </Button>
            </>
          )}
          <Button
            handleClick={() => {
              navigate(ADMIN_URL.KYC.replace(':userId', userId));
            }}
          >
            KYC
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
