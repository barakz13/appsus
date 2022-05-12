import { utilService } from '../services/util-service.js';
import { storageService } from '../services/async-storage-service.js';

const MAILS_KEY = 'mails';
const CRITERIA_KEY = 'criteria';
_createMails();

export const mailService = {
  query,
  remove,
  save,
  get,
};

export const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

function query() {
  return storageService.query(MAILS_KEY);
}

function remove(mailId) {
  return storageService.remove(MAILS_KEY, mailId);
}

function get(mailId) {
  return storageService.get(MAILS_KEY, mailId);
}

function save(mail) {
  if (mail.id) return storageService.put(MAILS_KEY, mail);
  else return storageService.post(MAILS_KEY, mail);
}

const criteria = {
  status: 'inbox/sent/trash/draft',
  txt: 'puki',
  isRead: true,
  isStared: true,
  lables: ['important', 'romantic'],
};

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY);
  if (!mails || !mails.length) {
    mails = [];
    mails = [
      {
        id: 'kIfL2',
        subject: 'Hello',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ultrices lectus, id consequat ex. Aliquam erat volutpat. Etiam orci ante, varius a mauris sit amet, semper varius erat. Vivamus maximus orci vel sem porta vestibulum vel eu risus.',
        isRead: true,
        sentAt: 1251133930594,
        address: 'bebe@bebe.com',
      },
      {
        id: 's1Ym6',
        subject: 'Goodbye!',
        body: 'Nam nibh nibh, pretium ut nisi id, consequat suscipit odio.',
        isRead: false,
        sentAt: 1051133930594,
        address: 'zizi@zizi.com',
      },
      {
        id: 'UCqSO',
        subject: 'Miss you!',
        body: 'Nulla condimentum, enim et fermentum eleifend, lorem enim ultrices ligula, nec egestas ipsum tellus a magna. In hac habitasse platea dictumst.',
        isRead: false,
        sentAt: 1551133930594,
        address: 'momo@momo.com',
      },
      {
        id: '0ZuNF',
        subject: 'Plans for next thursday',
        body: 'Donec non justo luctus, auctor tortor vitae, lacinia erat. Proin in convallis nisl. Cras lobortis nisi ac eros dignissim, quis mattis turpis gravida. Mauris tempor quam tortor, id maximus libero varius pharetra. Donec vel fermentum ante. Aenean ut accumsan ligula. Sed tincidunt tempus lectus, et malesuada neque placerat eget. Aenean sagittis diam vitae dolor consectetur, vel vestibulum felis interdum. Nam volutpat gravida eros vel gravida. Integer ipsum ex, fringilla id viverra sed, elementum eu ex. Maecenas rutrum ornare porta. Duis ullamcorper vestibulum aliquam. Integer congue neque a augue hendrerit fringilla. Mauris porta, velit ac blandit porttitor, lectus dui euismod est, in congue sem nibh sed leo. Proin efficitur, nulla eu facilisis ornare, est metus lobortis turpis, vel tincidunt est eros ut leo. Sed laoreet ac felis in imperdiet.',
        isRead: true,
        sentAt: 1151133930594,
        address: 'kuku@kuku.com',
      },
      {
        id: '6n2qZ',
        subject: 'Important meeting',
        body: 'Nam sit amet facilisis risus, vitae cursus sem. Ut lacinia mollis lorem, eu tempor sem dapibus eu. Donec id porttitor arcu. Aenean cursus libero et dignissim pulvinar. Morbi in orci pellentesque, fringilla nibh sed, elementum purus. Curabitur in erat maximus urna cursus lobortis sit amet nec turpis.',
        isRead: false,
        sentAt: 1351133930594,
        address: 'pypy@pypy.com',
      },
    ];
    utilService.saveToStorage(MAILS_KEY, mails);
  }
  return mails;
}
