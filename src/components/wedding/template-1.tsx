'use client';

import {
  ActionIcon,
  Affix,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Collapse,
  CopyButton,
  Flex,
  Grid,
  Group,
  Paper,
  RingProgress,
  Skeleton,
  Space,
  Stack,
  Text,
  TextInput,
  TextProps,
  Textarea,
  Title,
  Transition,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  useDisclosure,
  useInterval,
  useOs,
  useWindowScroll,
} from '@mantine/hooks';
import {
  IconAt,
  IconBook,
  IconBrandInstagram,
  IconCalendarPlus,
  IconCopy,
  IconGift,
  IconHome,
  IconMapPinFilled,
  IconMessage,
  IconMusic,
  IconMusicOff,
  IconSend,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { Fragment, Suspense, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { PaginateGuestBookResponse } from '~/app/api/guest/route';
import bride from '~/assets/aminah-min.png';
import bgWave from '~/assets/background/bg-abstract-1.jpg';
import bgCouple from '~/assets/background/bg-couple.png';
import heroBg from '~/assets/background/bg-sky.jpg';
import bgWayang from '~/assets/background/bg-wayang.png';
import flower1 from '~/assets/background/flower-1-trans.png';
import frameLeftTop from '~/assets/background/frame-left-top.png';
import frameRightBottom from '~/assets/background/frame-right-bottom.png';
import sakura2 from '~/assets/background/sakura-2.png';
import sakura3 from '~/assets/background/sakura-3.png';
import sakura4 from '~/assets/background/sakura-4.png';
import frameCover from '~/assets/frame-cover-min.png';
import groom from '~/assets/wachid-min.png';
import { useSound } from '~/hooks/use-sound/use-sound';
import { getInfo } from '~/lib/api';
import { GuestBookResponse } from '~/lib/supabase/requests';
import { isJson } from '~/utils/is-json';
// import { QRCodeImageClient } from '../qr-code/client/qr-code-client';

dayjs.locale('id');
dayjs.extend(relativeTime);

const i = getInfo();

interface CoverSectionProps {
  play(): void;
  inviteeName?: string;
}

const CoverSection = ({ play, inviteeName }: CoverSectionProps) => {
  const [opened, setOpen] = useState(true);
  /**
   * Used to prevent vertical scrolling on mobile devices
   */
  const toggleBodyOverflow = () => {
    if (document.body.style.overflow === 'hidden') {
      document.body.style.removeProperty('overflow');
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <Transition
      transition="fade"
      duration={400}
      timingFunction="ease"
      mounted={opened}
    >
      {transitionStyles => (
        <Center
          component="section"
          px="xs"
          bg="white"
          w="100%"
          h="100%"
          pos="fixed"
          top="50%"
          left="50%"
          maw={rem(500)}
          style={{
            ...transitionStyles,
            zIndex: 201,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AspectRatio
            pos="absolute"
            w="100%"
            h="100%"
            top={0}
            left={0}
            sx={{ zIndex: 1 }}
            ratio={720 / 1280}
          >
            <Image
              src={frameCover}
              fill
              placeholder="blur"
              alt=""
              style={{ objectFit: 'cover' }}
            />
          </AspectRatio>
          <Flex
            direction="column"
            justify="center"
            gap="xl"
            mih="500px"
            h="100vh"
            ta="center"
            py="xl"
            pos="relative"
            sx={{ zIndex: 2 }}
          >
            <Stack justify="center">
              <Stack spacing={46}>
                <Box>
                  <Title order={2} fw={600}>
                    YOU&apos;RE INVITED!
                  </Title>
                  <Text>THE WEDDING CELEBRATION OF</Text>
                </Box>
                <Box
                  id="couple"
                  pos="relative"
                  ff="var(--font-rouge-script)"
                  fz={rem(72)}
                  c="dark.4"
                >
                  <Title fz="inherit" mr="50px" ff="inherit" lh={1}>
                    {i.bride_name}
                  </Title>
                  <Title mr="25px" fz="inherit" ff="inherit" lh={1}>
                    &
                  </Title>
                  <Title fz="inherit" ml="25px" ff="inherit" lh={1}>
                    {i.groom_name}
                  </Title>
                </Box>
                {inviteeName && (
                  <Box>
                    <Text fz="lg">Dear</Text>
                    <Text fz={24} fw={600} mb={42}>
                      {inviteeName}
                    </Text>
                  </Box>
                )}
              </Stack>
            </Stack>
            <Box h={60}>
              <Button
                className="fx-zoom-in"
                size="md"
                onClick={() => {
                  toggleBodyOverflow();
                  setOpen(false);
                  play();
                }}
              >
                Open Invitation
              </Button>
            </Box>
          </Flex>
        </Center>
      )}
    </Transition>
  );
};

const HeroSection = () => (
  <Box component="section" px="xs" pos="relative">
    <Image
      src={heroBg}
      alt="Sky"
      fill
      style={{
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
    <Flex
      ta="center"
      h="100vh"
      justify="center"
      align="center"
      pos="relative"
      sx={{ zIndex: 1 }}
    >
      <Box fw={600}>
        <Text mb="xs" className="fade-in">
          &ldquo;And of His signs is that He created for you from yourselves
          mates that you may find tranquility in them and He placed between you
          affection and mercy. Indeed in that are signs for a people who give
          thought.&rdquo;
        </Text>
        <Text className="fade-in">(AR-RUM: 21)</Text>
      </Box>
    </Flex>
  </Box>
);

const CoupleSection = () => (
  <Box
    id="couple"
    component="section"
    px="xs"
    pb={50}
    bg="#fdf9f6"
    sx={{ overflow: 'hidden' }}
  >
    <Box h={100} pos="relative" sx={{ zIndex: 1 }}>
      <Flex
        justify="center"
        mt="md"
        pos="absolute"
        w="100%"
        sx={{ overflow: 'hidden', top: -20 }}
      >
        <Box pos="relative" w={250} h={250}>
          <Image
            src={flower1}
            fill
            alt="Flower"
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Flex>
    </Box>
    <Grid gutter="xs" pos="relative" sx={{ zIndex: 2 }}>
      <Grid.Col span={6}>
        <Paper className="fade-in" p="md" radius="lg" shadow="xs" ta="end">
          <Stack spacing="sm" align="end">
            <Text fz="xl" fw={600} ff="--font-cormorant-garamond" fs="italic">
              {i.bride_full_name}
            </Text>
            <Text size="sm" fs="italic">
              Putri {i.bride_birth_order} Bp. {i.bride_father_name} & Ibu{' '}
              {i.bride_mother_name}
            </Text>
            {i.bride_social_media.map(social => (
              <ActionIcon
                key={social.url}
                component="a"
                href={social.url}
                variant="transparent"
              >
                <IconBrandInstagram size="1.5rem" />
              </ActionIcon>
            ))}
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper
          className="fade-in"
          pos="relative"
          radius="lg"
          w="100%"
          h={290}
          bg="pink.2"
          shadow="xs"
          mb="xs"
          sx={{ overflow: 'hidden' }}
        >
          <Paper
            className="fade-in"
            pos="absolute"
            radius="lg"
            w="100%"
            h={290}
            bg="pink.0"
            opacity={0.5}
            shadow="xl"
            sx={{ right: rem(-30), bottom: rem(-30) }}
          />
          <Paper
            className="fade-in"
            pos="absolute"
            w="100%"
            h={290}
            bg="transparent"
            sx={{ bottom: -40, right: -20 }}
          >
            <Image
              src={bride}
              fill
              alt="Bride"
              style={{ objectFit: 'contain' }}
            />
          </Paper>
        </Paper>
      </Grid.Col>

      <Grid.Col span={6}>
        <Paper
          className="fade-in"
          pos="relative"
          radius="lg"
          w="100%"
          h={290}
          bg="pink.2"
          shadow="xs"
          mb="xs"
          sx={{ overflow: 'hidden' }}
        >
          <Paper
            className="fade-in"
            pos="absolute"
            radius="lg"
            w="100%"
            h={290}
            bg="pink.0"
            opacity={0.5}
            shadow="xl"
            sx={{ left: rem(-30), bottom: rem(-30) }}
          />
          <Paper
            className="fade-in"
            pos="absolute"
            w="100%"
            h={290}
            bg="transparent"
            sx={{ bottom: -30 }}
          >
            <Image
              src={groom}
              fill
              alt="Groom"
              style={{ objectFit: 'contain' }}
            />
          </Paper>
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper className="fade-in" p="md" radius="lg" shadow="xs">
          <Stack spacing="sm">
            <Text fz="xl" fw={600} ff="--font-cormorant-garamond" fs="italic">
              {i.groom_full_name}
            </Text>
            <Text size="sm" fs="italic">
              Putra {i.groom_birth_order} Bp. {i.groom_father_name} & Ibu{' '}
              {i.groom_mother_name}
            </Text>
            {i.groom_social_media.map(social => (
              <ActionIcon
                key={social.url}
                component="a"
                href={social.url}
                variant="transparent"
              >
                <IconBrandInstagram size="1.5rem" />
              </ActionIcon>
            ))}
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  </Box>
);

const MapIframe = () => (
  <iframe
    src={i.google_map_embed_url}
    style={{ border: 0, width: '100%', height: 300 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
);

const TitleSection = ({ children, ...props }: TextProps) => (
  <Text size={28} ff="--font-playfair-display" fw={600} {...props}>
    {children}
  </Text>
);

const DateSection = () => {
  return (
    <Box
      id="date"
      component="section"
      ta="center"
      pb="1rem"
      pos="relative"
      sx={{ zIndex: 3 }}
    >
      <Box className="fade-in" pos="relative" my="xl">
        <TitleSection mb="xl">Resepsi</TitleSection>
        <Text>Minggu</Text>
        <Text size="xl" fw="bold">
          12 | 11
        </Text>
        <Text>Dua Ribu Dua Puluh Tiga</Text>

        <Box className="fade-in" pos="absolute" w={100} top={20} left={-25}>
          <AspectRatio ratio={218 / 167}>
            <Image src={sakura2} fill alt="" />
          </AspectRatio>
        </Box>
        <Box className="fade-in" pos="absolute" w={100} top={20} right={-25}>
          <AspectRatio ratio={218 / 167}>
            <Image src={sakura2} fill alt="" />
          </AspectRatio>
        </Box>
      </Box>
      <Box
        className="fade-in"
        pos="relative"
        w="100%"
        h="200px"
        bg="pink.2"
        mb="lg"
      >
        <Center
          pos="absolute"
          bg="rgba(0, 0, 0, 0.75)"
          w="100%"
          h="100%"
          sx={{ zIndex: 2 }}
        >
          <Text
            className="fade-in"
            c="white"
            size={50}
            ff="var(--font-rouge-script)"
            fs="italic"
          >
            Save The Date
          </Text>
        </Center>
        <Image
          className="fade-in"
          src={bgWayang}
          fill
          alt=""
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box className="fade-in" mb="xs" px="xs">
        <Box mb="xs">
          {i.wedding_party.map(session => (
            <Text key={session.order}>
              Sesi {session.order} : Pukul{' '}
              {dayjs(session.start_date).format('HH : mm')} -{' '}
              {dayjs(session.end_date).format('HH : mm')}
            </Text>
          ))}
        </Box>
        <IconMapPinFilled size="1.5rem" />
        <Text>{i.address}</Text>
      </Box>
      <Paper className="fade-in" m="sm" p="3px" radius="md" shadow="xs">
        <Suspense fallback={<Skeleton h={300} />}>
          <MapIframe />
        </Suspense>
      </Paper>
      <Button
        className="fade-in"
        component="a"
        href={i.google_map_share_url}
        target="_blank"
        my="md"
      >
        View Location
      </Button>

      {/* <QRCodeImageClient /> */}
      <Space mb="md" />
    </Box>
  );
};

const AttendanceSection = () => (
  <Box id="attendance" component="section" ta="center" bg="pink.2">
    <TitleSection mb="xl">RSVP</TitleSection>

    <Text fz="sm">
      YUK KONFIRMASI KEHADIRAN KAMU, AGAR KAMI DAPAT MENGINGATKAN TANGGALNYA
      LEWAT EMAIL KAMU
    </Text>
    <Text fz="sm">TERIMA KASIH</Text>

    <Box component="form" ta="start" my="md" p="xs">
      <TextInput
        label="Nama"
        placeholder="Masukkan Nama Kamu"
        withAsterisk
        icon={<IconUser size="1rem" />}
      />
      <TextInput
        type="email"
        label="Email"
        placeholder="Masukkan Email Kamu"
        withAsterisk
        icon={<IconAt size="1rem" />}
      />
      <TextInput
        label="Alamat"
        placeholder="Masukkan Alamat Kamu"
        icon={<IconMapPinFilled size="1rem" />}
      />
      <Box ta="center">
        <Button type="submit" my="sm" leftIcon={<IconSend size="1.2rem" />}>
          Kirim
        </Button>
      </Box>
    </Box>
  </Box>
);

interface CountdownTime {
  isAfter: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calculates the countdown time.
 * We're using `Math.abs` because we don't want the time value to be negative after the countdown time passed.
 */
function getRemainingTime(endTime: string): CountdownTime {
  const total = Date.parse(endTime) - Date.now();
  const days = Math.abs(Math.floor(total / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(Math.floor((total / (1000 * 60 * 60)) % 24));
  const minutes = Math.abs(Math.floor((total / 1000 / 60) % 60));
  const seconds = Math.abs(Math.floor((total / 1000) % 60));

  return {
    isAfter: total < 1,
    days,
    hours,
    minutes,
    seconds,
  };
}

const CountdownSection = () => {
  const os = useOs();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [time, setTime] = useState<CountdownTime>({
    isAfter: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const interval = useInterval(() => {
    setTime(getRemainingTime(i.date.split('T')[0]));
  }, 1_000);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      className="fade-in"
      component="section"
      ta="center"
      pt="7rem"
      pb="3rem"
      pos="relative"
      // bg="pink.2"
      sx={{ zIndex: 1 }}
    >
      <Stack spacing={48}>
        <TitleSection>
          {time.isAfter ? 'Waktu yang Terlewati' : 'Menghitung Mundur'}
        </TitleSection>

        <Grid columns={28} justify="center" gutter={0} fz={28} fw={500}>
          <Grid.Col span={3}>
            <Text>{time.days}</Text>
            <Text fz="sm" fw={300}>
              HARI
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>:</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{time.hours}</Text>
            <Text fz="sm" fw={300}>
              JAM
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>:</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{time.minutes}</Text>
            <Text fz="sm" fw={300}>
              MENIT
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>:</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{time.seconds}</Text>
            <Text fz="sm" fw={300}>
              DETIK
            </Text>
          </Grid.Col>
        </Grid>

        <Button
          ref={btnRef}
          leftIcon={<IconCalendarPlus size="1rem" />}
          display="block"
          my="md"
          mx="auto"
          onClick={async () => {
            let appOptions: Parameters<
              typeof handleAddToCalendar
            >[0]['options'] = ['Google'];
            if (os !== 'android') {
              appOptions = ['Apple', 'Google', 'iCal'];
            }
            const handleAddToCalendar = (await import('add-to-calendar-button'))
              .atcb_action;
            const calendarOptions: Parameters<typeof handleAddToCalendar>[0] = {
              name: `${i.bride_name} & ${i.groom_name}'s Wedding`,
              options: appOptions,
              location: i.address,
              startDate: i.date.split('T')[0],
              endDate: i.date.split('T')[0],
              startTime: '08:00',
              endTime: '23:00',
              timeZone: 'Asia/Jakarta',
            };

            handleAddToCalendar(
              calendarOptions,
              btnRef.current as HTMLButtonElement
            );
          }}
        >
          Add to Calendar
        </Button>
      </Stack>
    </Box>
  );
};

const GuestBookSection = () => {
  const mounted = useRef(false);
  const [guests, setGuests] = useState<GuestBookResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isMutating, setMutating] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      comment: '',
    },

    validate: {
      name: value => (value ? null : 'Silakan isi nama'),
      comment: value =>
        value && value.length < 4 ? 'Minimum pesan adalah 4 karakter' : null,
    },
  });

  const getPagination = () => {
    const PER_PAGE = 5;
    let from = page * PER_PAGE;
    let to = from - 1 + PER_PAGE;
    // if (page > 0) {
    //   from += 1;
    // }
    return { from, to };
  };

  const fetchGuestBook = async () => {
    try {
      setLoading(true);

      const { from, to } = getPagination();
      const response = await fetch('/api/guest?from=' + from + '&to=' + to);
      if (!response.ok) {
        throw new Error('Unable to fetch guest');
      }
      const result = (await response.json()) as PaginateGuestBookResponse;
      setPage(state => state + 1);
      setGuests(state => [...state, ...result.items]);
      if (total !== result.total) {
        setTotal(result.total);
      }
    } catch (_) {
      toast.error('Gagal memuat buku tamu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) return;

    fetchGuestBook();

    return () => {
      mounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      id="guest-book"
      component="section"
      pos="relative"
      ta="center"
      sx={{ zIndex: 3 }}
    >
      <Box bg="white" pos="relative" py="xl">
        <TitleSection className="fade-in" my="xl">
          Buku Tamu
        </TitleSection>

        <Box className="fade-in" pos="absolute" w={80} top={35} left={-18}>
          <AspectRatio ratio={150 / 110}>
            <Image src={sakura3} fill alt="" />
          </AspectRatio>
        </Box>
        <Box className="fade-in" pos="absolute" w={130} top={15} right={-30}>
          <AspectRatio ratio={533 / 350} sx={{ rotate: '240deg' }}>
            <Image src={sakura4} fill alt="" />
          </AspectRatio>
        </Box>

        <Text className="fade-in" fz="sm">
          BUKU INI SPESIAL BUAT KAMU YANG MAU KASIH PESAN / UCAPAN BUAT KAMI
          BERDUA YA, TERIMA KASIH.
        </Text>
      </Box>

      <Box bg="transparent" pb="md">
        <Box h={200} pos="relative">
          <Center
            pos="absolute"
            bg="rgba(0, 0, 0, 0.75)"
            w="100%"
            h="100%"
            sx={{ zIndex: 2 }}
          >
            <Text
              className="fade-in"
              c="white"
              size={50}
              ff="var(--font-rouge-script)"
              fs="italic"
            >
              Hope & Love This Moment
            </Text>
          </Center>
          <Image
            className="fade-in"
            src={bgCouple}
            fill
            alt=""
            style={{ objectFit: 'cover' }}
          />
        </Box>

        <Paper
          className="fade-in"
          m="md"
          mb={48}
          p="sm"
          radius="lg"
          shadow="xs"
        >
          <Box
            component="form"
            ta="start"
            onSubmit={form.onSubmit(async data => {
              try {
                setMutating(true);
                const response = await fetch('/api/guest', {
                  method: 'POST',
                  body: JSON.stringify(data),
                });
                const result = (await response.json()) as GuestBookResponse[];
                if (!response.ok) throw new Error(JSON.stringify(result));

                setGuests(state => [...result, ...state]);
                form.reset();
              } catch (error) {
                let message = 'Gagal menambah buku tamu. ';
                if (error instanceof Error) {
                  message += isJson(error.message)
                    ? JSON.parse(error.message)?.message
                    : 'Unknown';
                }
                toast.error(message);
              } finally {
                setMutating(false);
              }
            })}
          >
            <TextInput
              label="Nama"
              placeholder="Masukkan Nama Kamu"
              required
              withAsterisk
              icon={<IconUser size="1rem" />}
              mb="xs"
              {...form.getInputProps('name')}
            />
            <Textarea
              label="Pesan / Wejangan"
              placeholder="Masukkan Pesan / Wejangan Kamu"
              required
              icon={<IconMessage size="1rem" />}
              minRows={4}
              mb="xs"
              {...form.getInputProps('comment')}
            />
            <Box ta="center">
              <Button
                type="submit"
                leftIcon={<IconSend size="1.2rem" />}
                loading={isMutating}
              >
                Kirim
              </Button>
            </Box>
          </Box>
        </Paper>

        {guests.length > 0 && (
          <Paper m="md" p="sm" radius="lg" shadow="xs" ta="start">
            {guests.map(guest => {
              const [first, second] = guest.name?.split(' ') ?? [];

              return (
                <Group key={guest.id} align="start" spacing="xs">
                  <Avatar
                    variant="filled"
                    color="dark"
                    radius="xl"
                    tt="uppercase"
                  >
                    {first?.[0]}
                    {second?.[0]}
                  </Avatar>
                  <Box mb="xs">
                    <Title order={5} mb={4}>
                      {guest.name}
                    </Title>
                    <Text size="sm">{guest.comment}</Text>
                    <Text size="xs" mt={4}>
                      {dayjs(guest.created_at).fromNow()}
                    </Text>
                  </Box>
                </Group>
              );
            })}
            {guests.length < total && (
              <Box ta="center" onClick={() => fetchGuestBook()}>
                <Button loading={isLoading}>Muat Lebih</Button>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

interface CopyBankButtonProps {
  id: string;
  copy(): void;
  copied: boolean;
}

const CopyBankButton = ({ id, copied, copy }: CopyBankButtonProps) => {
  useEffect(() => {
    if (copied) {
      toast.success('Nomor rekening berhasil disalin', { id });
    }
  }, [copied, id]);

  return (
    <Button
      variant="white"
      title="Salin Nomor Rekening"
      onClick={() => {
        if (!copied) {
          copy();
        }
      }}
      rightIcon={<IconCopy size="1.2rem" />}
      p={0}
    >
      Salin
    </Button>
  );
};

const GiftSection = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Box
      id="gift"
      component="section"
      ta="center"
      p="xl"
      pos="relative"
      sx={{ zIndex: 3 }}
    >
      <Paper
        className="fade-in"
        pos="relative"
        my="xl"
        p="md"
        radius="lg"
        shadow="xs"
        sx={{ zIndex: 2 }}
      >
        <TitleSection mb="xl">Kirim Hadiah</TitleSection>

        <Text fz="sm" mb="lg">
          TERIMA KASIH TELAH MENAMBAH SEMANGAT KEGEMBIRAAN PERNIKAHAN KAMI
          DENGAN KEHADIRAN DAN HADIAH INDAH.
        </Text>

        <Button leftIcon={<IconGift size="1.2rem" />} onClick={toggle}>
          Cashless
        </Button>
        <Collapse in={opened}>
          <Flex justify="center" my="md">
            <Grid align="center" gutter="xs" w="100%">
              {i.payments.map(payment => (
                <Fragment key={payment.id}>
                  <Grid.Col span={3}>
                    <Image
                      src={payment.icon}
                      width={60}
                      height={60}
                      alt={payment.name}
                    />
                  </Grid.Col>
                  <Grid.Col span={9}>
                    <Grid align="center" ta="start">
                      <Grid.Col span={8}>
                        <Text fw={600}>{payment.account_number}</Text>
                        <Text fz="sm">a/n {payment.account_holder}</Text>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <CopyButton
                          value={payment.account_number}
                          timeout={2000}
                        >
                          {({ copied, copy }) => (
                            <CopyBankButton
                              id={payment.id}
                              copied={copied}
                              copy={copy}
                            />
                          )}
                        </CopyButton>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Fragment>
              ))}
            </Grid>
          </Flex>
        </Collapse>
      </Paper>
    </Box>
  );
};

const Footer = () => (
  <Box component="footer" ta="center" pos="relative" py={150}>
    <Box
      className="fade-in"
      pos="absolute"
      w={300}
      left={-45}
      top={-25}
      sx={{ opacity: 0.75, zIndex: 2 }}
    >
      <AspectRatio ratio={378 / 341}>
        <Image src={frameLeftTop} fill alt="" />
      </AspectRatio>
    </Box>

    <Stack className="fade-in" spacing="xl" mx="lg">
      <TitleSection>Terima Kasih</TitleSection>

      <Text>
        Atas kehadiran dan Do&apos;a Restunya kami ucapkan terima kasih.
      </Text>
      <Text fs="italic">Hormat Kami Yang Mengundang.</Text>
      <Box ff="var(--font-rouge-script)">
        <Title ff="inherit" fz={36}>
          {i.bride_name} & {i.groom_name}
        </Title>
      </Box>
    </Stack>

    <Box
      className="fade-in"
      pos="absolute"
      w={300}
      right={-35}
      bottom={-45}
      sx={{ opacity: 0.75, zIndex: 2 }}
    >
      <AspectRatio ratio={364 / 335}>
        <Image src={frameRightBottom} fill alt="" />
      </AspectRatio>
    </Box>
  </Box>
);

interface TabProps {
  title: string;
  icon: JSX.Element;
  onClick(): void;
}

const Tab = ({ title, icon, onClick }: TabProps) => {
  return (
    <UnstyledButton
      onClick={onClick}
      p="xs"
      w="100%"
      color=""
      sx={theme => ({
        ...(title == 'Acara' && {
          color: theme.colors.pink[5],
          fontWeight: 'bold',
        }),
        borderRadius: 5,
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.05)',
        },
      })}
    >
      <Stack align="center" spacing={1}>
        {icon}
        <Text fz="xs">{title}</Text>
      </Stack>
    </UnstyledButton>
  );
};

const BottomTabNavigation = () => {
  const [scroll, scrollTo] = useWindowScroll();

  // console.log('scroll', scroll);

  const handleScroll = () => scrollTo({ y: 0 });

  const handleScrollIntoView = (selector: string) => () => {
    const el = document.getElementById(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Affix w="100%" position={{ bottom: 0 }} p="xs">
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {transitionStyles => (
          <Paper
            w="100%"
            maw="500px"
            mx="auto"
            style={transitionStyles}
            px={5}
            shadow="md"
            radius="md"
          >
            <Grid columns={5} gutter={6}>
              <Grid.Col span={1}>
                <Tab
                  title="Home"
                  icon={<IconHome size="1.4rem" />}
                  onClick={handleScroll}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Tab
                  title="Mempelai"
                  icon={<IconUsers size="1.4rem" />}
                  onClick={handleScrollIntoView('couple')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Tab
                  title="Acara"
                  icon={<IconCalendarPlus size="1.4rem" />}
                  onClick={handleScrollIntoView('date')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Tab
                  title="Tamu"
                  icon={<IconBook size="1.4rem" />}
                  onClick={handleScrollIntoView('guest-book')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Tab
                  title="Hadiah"
                  icon={<IconGift size="1.4rem" />}
                  onClick={handleScrollIntoView('gift')}
                />
              </Grid.Col>
            </Grid>
          </Paper>
        )}
      </Transition>
    </Affix>
  );
};

/**
 * Format the time from seconds to M:SS.
 * @param  {Number} secs Seconds to format.
 * @return {String}      Formatted time.
 */
const formatTime = (secs: number) => {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = secs - minutes * 60 || 0;

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

interface Props {
  inviteeName?: string;
}

export function Template1({ inviteeName }: Props) {
  const [muted, handler] = useDisclosure();
  const [progress, setProgress] = useState(0);
  const [play, { sound }] = useSound('/song/cintanya-aku.mp3', {
    volume: muted ? 0 : 1,
    loop: true,
    html5: true,
    onplay: () => {
      interval.start();
    },
  });

  function step() {
    if (!sound) return;

    const seek = sound.seek() || 0;
    const percentage = Math.floor((seek / sound.duration()) * 100 || 0);
    // console.log('data', { time: formatTime(Math.round(seek)), percentage });
    setProgress(percentage);
  }

  const interval = useInterval(() => step(), 1_000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => interval.stop, []);

  // Init scroll reveal animation
  useEffect(() => {
    import('scrollreveal').then(({ default: scrollReveal }) => {
      scrollReveal().reveal('.fade-in', {
        delay: 350,
        interval: 200,
        scale: 0.75,
      });
    });
  }, []);

  let show = true;

  return (
    <>
      <Affix w="100%" position={{ top: 0, left: 0 }} p="xs">
        <Box maw={480} mx="auto">
          <RingProgress
            size={50}
            thickness={2}
            roundCaps
            rootColor="transparent"
            sections={[{ value: progress, color: 'pink' }]}
            label={
              <Center>
                <ActionIcon
                  aria-label="Toggle music"
                  size={40}
                  c="dark.3"
                  color={muted ? 'gray' : 'pink.2'}
                  radius="xl"
                  variant="light"
                  onClick={handler.toggle}
                >
                  {muted ? (
                    <IconMusicOff size="1.25rem" />
                  ) : (
                    <IconMusic size="1.25rem" />
                  )}
                </ActionIcon>
              </Center>
            }
          />
        </Box>
      </Affix>
      {show && <CoverSection play={play} inviteeName={inviteeName} />}
      <HeroSection />
      <CoupleSection />
      <DateSection />
      <Box pos="relative" sx={{ zIndex: 2 }}>
        <Box
          bg="white"
          pos="absolute"
          w="45rem"
          h="20rem"
          bottom={-200}
          left="50%"
          sx={{
            borderRadius: '45rem / 20rem',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
      {/* <AttendanceSection /> */}
      <Box pos="relative" sx={{ overflow: 'hidden' }}>
        <Box pos="absolute" w={1000} h={1000} top={-100} style={{ zIndex: 1 }}>
          <Image src={bgWave} fill alt="" style={{ objectFit: 'cover' }} />
        </Box>

        <CountdownSection />
      </Box>
      <Box pos="relative">
        <GuestBookSection />
        <GiftSection />
        <Box pos="relative" sx={{ zIndex: 2 }}>
          <Box
            bg="pink.2"
            pos="absolute"
            w="100rem"
            h="45rem"
            bottom={-350}
            left="50%"
            sx={{
              borderRadius: '100rem / 45rem',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            <Box w={600} h={1200} top={200} style={{ zIndex: 1 }}>
              <Image src={bgWave} fill alt="" style={{ objectFit: 'cover' }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />

      <BottomTabNavigation />
    </>
  );
}
