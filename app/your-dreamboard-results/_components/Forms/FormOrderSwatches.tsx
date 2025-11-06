'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import Overlay from '@/components/Overlay';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// HARDCODED IMAGE
import product_image from '@/public/images/forms/test-data/product.png';
import cn from '@/utils/cn';

interface IComponentProps {
  className?: string;
}

import { CirclePlus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  type BulkProcessJsonRequest,
  generateBulkProcessJson,
} from '@/actions/generate';
import dreamspace_bohemian_bg from '@/public/images/forms/dreamspace_bohemian_bg.jpg';
import InputFile from '../Inputs/InputFile';
import InputRadioBox from '../Inputs/InputRadioBox';
import InputSwatches from '../Inputs/InputSwatches';
import InputTakePicture from '../Inputs/InputTakePicture';
import InputText from '../Inputs/InputText';

const formSchema = z
  .object({
    photoDevice: z.any().optional().nullable(),
    photoCamera: z.any().optional().nullable(),
    style: z.string().min(1, 'Please select a style'),
    prompt: z.string().min(5, 'Please enter at least 5 characters'),
    swatches: z.array(z.instanceof(File)).max(10, 'Maximum 10 swatches'),
  })
  .superRefine((data, ctx) => {
    const deviceLen =
      data.photoDevice &&
      typeof data.photoDevice === 'object' &&
      'length' in data.photoDevice
        ? (data.photoDevice as FileList).length
        : 0;
    const cameraLen =
      data.photoCamera &&
      typeof data.photoCamera === 'object' &&
      'length' in data.photoCamera
        ? (data.photoCamera as FileList).length
        : 0;
    if (!deviceLen && !cameraLen) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['photoDevice'],
        message: 'Please upload or take a photo',
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['photoCamera'],
        message: 'Please upload or take a photo',
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const FormOrderSwatches = ({ className }: IComponentProps) => {
  const classNameRounded = 'rounded-[16px]';
  const router = useRouter();
  const [showSwatches, setShowSwatches] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoDevice: null,
      photoCamera: null,
      style: '',
      prompt: 'Please render a beautiful futuristic design',
      swatches: [],
    },
  });

  const photoDevice = useWatch({ control, name: 'photoDevice' });
  const [deviceUrls, setDeviceUrls] = useState<string[]>([]);

  useEffect(() => {
    const files =
      photoDevice && typeof photoDevice === 'object' && 'length' in photoDevice
        ? (Array.from(photoDevice as FileList) as File[])
        : [];
    const urls = files.map((file) => URL.createObjectURL(file));
    setDeviceUrls(urls);
    return () => {
      urls.forEach((u) => {
        URL.revokeObjectURL(u);
      });
    };
  }, [photoDevice]);

  const handleRemoveDeviceImage = (index: number) => {
    const files =
      photoDevice && typeof photoDevice === 'object' && 'length' in photoDevice
        ? (Array.from(photoDevice as FileList) as File[])
        : [];
    if (index < 0 || index >= files.length) return;
    const dataTransfer = new DataTransfer();
    files.forEach((file, i) => {
      if (i !== index) dataTransfer.items.add(file);
    });
    setValue('photoDevice', dataTransfer.files, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const fileToBase64 = async (file: File) => {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++)
      binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const urlToBase64 = async (url: string) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++)
      binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const onSubmit = async (data: FormValues) => {
    // user description: Please render a beautiful futuristic design
    const swatchFiles = data.swatches ?? [];
    const roomFiles = [
      ...(Array.from(data.photoDevice ?? []) as File[]),
      ...(Array.from(data.photoCamera ?? []) as File[]),
    ];

    const swatch_images = await Promise.all(
      swatchFiles.map(async (file) => ({
        base64_data: await fileToBase64(file),
        filename: file.name,
        metadata: {},
      })),
    );

    const room_images = await Promise.all(
      roomFiles.map(async (file) => ({
        base64_data: await fileToBase64(file),
        filename: file.name,
        metadata: {},
      })),
    );

    const product_images = [
      {
        base64_data: await urlToBase64(product_image.src),
        filename: 'product.png',
        metadata: {},
      },
    ];

    const payload: BulkProcessJsonRequest = {
      swatch_images,
      product_images,
      room_images,
      room_styles: data.style,
      room_aspect_ratio: 'landscape',
      retain_room_structure: false,
      make_combinations: true,
      user_description: data.prompt,
      generate_mood_board: true,
      generate_video: true,
      generate_social_content: true,
    };

    console.log('onSubmit -> payload:', payload);

    try {
      const res = await generateBulkProcessJson(payload);
      console.log('Submitted successfully', res);
      if (res?.session_id) {
        router.push(`/your-dreamboard-results?id=${res.session_id}`);
      }
    } catch (error) {
      console.error('Failed to submit', error);
    }
  };

  return (
    <div
      className={cn(
        'FormOrderSwatches',
        'h-[130px] w-full',
        'bg-[#f9f8f7]',
        'fixed bottom-0 left-0',
        'z-[20]',
        'shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <div
        className={cn(
          'container',
          'flex items-center justify-between',
          'h-full',
        )}
      >
        {/* COL LEFT */}
        <div className="relative flex items-center justify-center gap-[10px]">
          <span
            className={cn(
              'font-bold text-[60px]',
              'uppercase',
              'leading-[1]',
              'text-[#eae8e4]',
            )}
          >
            Up to 10 dream fabrics
          </span>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowSwatches(!showSwatches)}
          >
            {showSwatches ? (
              <CircleX className="text-gray-500" />
            ) : (
              <CirclePlus className="text-gray-500" />
            )}
          </button>
          {showSwatches && (
            <Controller
              name="swatches"
              control={control}
              render={({ field }) => (
                <InputSwatches
                  className="-translate-y-1/2 absolute top-1/2 left-0"
                  value={(field.value as File[]) ?? []}
                  onChange={field.onChange}
                  max={5}
                />
              )}
            />
          )}
        </div>
        {/* COL RIGHT */}
        <div
          className={cn('flex flex-col items-center justify-center gap-[10px]')}
        >
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className={cn(
                  'bg-gradient-to-l from-[rgb(71,213,225)] to-[rgb(46,228,185)]',
                  'rounded-[70px]',
                  'px-[24px]',
                  'py-[10px]',
                  'text-white',
                  'font-bold',
                  'text-[14px]',
                  'uppercase',
                  'w-[315px]',
                  'h-[62px]',
                  'cursor-pointer',
                  'hover:bg-gradient-to-r',
                  'tracking-[1.4px]',
                )}
              >
                <span>Order Swatches</span>
              </button>
            </DialogTrigger>
            <DialogContent
              className={cn(
                '!max-w-2xl !w-[95vw] max-h-[95vh]',
                'w-full overflow-hidden border-none',
                'bg-[linear-gradient(132deg,rgb(227,221,213)_0%,rgb(168,132,104)_72%)]',
                'p-[24px]',
                classNameRounded,
                isSubmitting && 'pointer-events-none',
              )}
              showCloseButton={false}
            >
              <div className="relative">
                {isSubmitting && <Overlay className="z-[100]" />}
                {isSubmitting && (
                  <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40">
                    <div className="flex flex-col items-center gap-3 text-white">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="text-sm tracking-wide">Submitting…</span>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-[60px]">
                  {/* COL LEFT */}
                  <div>
                    <DialogHeader className="flex flex-col items-center justify-center gap-[30px]">
                      <DialogTitle className="flex flex-col items-center justify-center text-center font-bold text-2xl">
                        <span
                          className={cn(
                            'bg-[linear-gradient(to_right,rgb(162,147,130),rgb(126,94,68))] bg-clip-text text-transparent',
                            'text-[68px]',
                            'uppercase',
                          )}
                        >
                          DreamSpace.
                        </span>
                        <span
                          className={cn(
                            'text-[#6a5c4f]',
                            'tracking-[7px]',
                            'uppercase',
                            'font-normal',
                            'text-[18px]',
                          )}
                        >
                          Step into your DreamSpace.
                        </span>
                      </DialogTitle>

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full flex-col items-center justify-center gap-[20px]"
                      >
                        <div className="flex items-center justify-center gap-[20px]">
                          <Controller
                            name="photoDevice"
                            control={control}
                            render={({ field }) => (
                              <InputFile
                                id="file-input"
                                name={field.name}
                                aria-invalid={
                                  Boolean(errors.photoDevice) ||
                                  Boolean(errors.photoCamera)
                                }
                                multiple
                                onChange={(e) => {
                                  const inputEl = e.target as HTMLInputElement;
                                  const selectedFiles = Array.from(
                                    inputEl.files ?? [],
                                  );
                                  const existingFiles =
                                    photoDevice &&
                                    typeof photoDevice === 'object' &&
                                    'length' in photoDevice
                                      ? (Array.from(
                                          photoDevice as FileList,
                                        ) as File[])
                                      : [];
                                  const dataTransfer = new DataTransfer();
                                  [...existingFiles, ...selectedFiles].forEach(
                                    (file) => {
                                      dataTransfer.items.add(file);
                                    },
                                  );
                                  field.onChange(dataTransfer.files);
                                  // clear the input so selecting the same file triggers onChange next time
                                  inputEl.value = '';
                                }}
                                ref={field.ref}
                              />
                            )}
                          />
                          <Controller
                            name="photoCamera"
                            control={control}
                            render={({ field }) => (
                              <InputTakePicture
                                id="camera-input"
                                name={field.name}
                                aria-invalid={
                                  Boolean(errors.photoDevice) ||
                                  Boolean(errors.photoCamera)
                                }
                                onChange={(e) =>
                                  field.onChange(
                                    (e.target as HTMLInputElement).files,
                                  )
                                }
                                ref={field.ref}
                              />
                            )}
                          />
                        </div>
                        {(errors.photoDevice || errors.photoCamera) && (
                          <span className="font-medium text-[#b91c1c] text-[13px]">
                            Please upload or take a photo
                          </span>
                        )}

                        <span className="text-center font-bold text-[#968d82] text-[17px]">
                          How do you want to style your room?
                        </span>

                        <Controller
                          name="style"
                          control={control}
                          render={({ field }) => (
                            <InputRadioBox
                              className={cn(
                                'w-full',
                                errors.style && 'border-[#b91c1c]',
                              )}
                              label="How do you want to style your room?"
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.style?.message && (
                          <span className="font-medium text-[#b91c1c] text-[13px]">
                            {errors.style.message}
                          </span>
                        )}

                        <InputText
                          className="shrink"
                          id="input-text"
                          placeholder="Type here what would you like to see in your room?"
                          aria-invalid={Boolean(errors.prompt)}
                          {...register('prompt')}
                        />
                        {errors.prompt?.message && (
                          <span className="font-medium text-[#b91c1c] text-[13px]">
                            {errors.prompt.message}
                          </span>
                        )}

                        <button
                          type="submit"
                          className={cn(
                            'text-white',
                            'bg-[linear-gradient(132deg,rgba(235,197,131,1)_0%,rgba(177,157,86,1)_50%,rgba(121,147,94,1)_100%)]',
                            'tracking-[9.1px]',
                            'uppercase',
                            'font-bold',
                            'text-[13px]',
                            'h-[65px] w-[305px]',
                            'rounded-[11px]',
                            'cursor-pointer',
                            'shadow-xl',
                            'transition-all duration-300 hover:scale-103',
                            'mb-[60px]',
                          )}
                          disabled={isSubmitting}
                        >
                          Design Yours
                        </button>
                      </form>
                      <hr className="w-full" />
                      <hr className="w-full" />
                    </DialogHeader>
                  </div>

                  {/* COL RIGHT */}
                  <div
                    className={cn(
                      'relative',
                      classNameRounded,
                      'overflow-hidden',
                      'flex items-center justify-center',
                    )}
                  >
                    <Overlay />
                    {deviceUrls.length > 0 && (
                      <div
                        className={cn(
                          'absolute top-[10px] right-[10px] z-[10]',
                          'max-w-[70%]',
                          'flex flex-col flex-wrap gap-[8px]',
                        )}
                      >
                        {deviceUrls.map((url, i) => (
                          <div className="relative" key={url}>
                            <Image
                              src={url}
                              alt="device_image"
                              width={130}
                              height={78}
                              className="rounded-[8px] object-cover shadow"
                            />
                            <button
                              type="button"
                              className="absolute top-[5px] right-[5px] cursor-pointer hover:[&>svg]:text-black"
                              onClick={() => handleRemoveDeviceImage(i)}
                            >
                              <CircleX className="text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* <div className="absolute top-[10px] right-[10px] z-[10]">
                    <Image
                      src={dreamspace_tile}
                      alt="title_bohemian_bg"
                      width={130}
                      height={78}
                      className="rounded-[18px] object-cover"
                    />
                  </div> */}
                    <Image
                      src={dreamspace_bohemian_bg}
                      alt="dreamspace_bohemian_bg"
                      fill
                      className="object-cover"
                    />
                    <div className="relative z-[10] flex flex-col items-center justify-center text-white">
                      <span className="uppercase tracking-[13px]">
                        Dream in
                      </span>
                      <span className="font-es-wf text-[120px] leading-[1]">
                        Bohemian
                      </span>
                    </div>
                    <ul
                      className={cn(
                        'flex items-center justify-center gap-[10px]',
                        'text-white',
                        '-translate-x-1/2 absolute bottom-[30px] left-1/2 z-[10]',
                        'text-[14px]',
                      )}
                    >
                      <li className="border-white border-r pr-[10px]">
                        MODERN
                      </li>
                      <li className="border-white border-r pr-[10px]">
                        CONTEMPO
                      </li>
                      <li className="border-white border-r pr-[10px]">
                        MIDCENTURY
                      </li>
                      <li className="border-white border-r pr-[10px]">BOHO</li>
                      <li>MINIMALISTIC</li>
                    </ul>
                  </div>
                </div>

                <div className="absolute top-[10px] right-[10px] z-[10] flex justify-end">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className={cn(
                        'h-[25px] w-[25px]',
                        'flex items-center justify-center',
                        'rounded-[5px]',
                        'cursor-pointer bg-gray-100 font-medium text-gray-700 text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-0',
                      )}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <span className="font-semibold text-[#928e87] text-[14px] tracking-[0.7px]">
            Delivered Free in 1-3 Days
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormOrderSwatches;
