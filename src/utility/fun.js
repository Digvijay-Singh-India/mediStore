var regexM = /^[6-9][0-9]{9}$/;
const fun = {
 filter_value: function (value) {
  if (value) {
   return value.trim().replace(/[\s\t\n]+/g, ' ');
  } else {
   return false;
  }

  return value.trim().replace(/ +(?= )/g, '');
 },
 isEmpty: function (e) {
  if (e == null && e == undefined) {
   return true;
  } else if (this.filter_value(e) == '') {
   return true;
  } else {
   return false;
  }
 },
 validate_mob: function (mob) {
  if (mob.charAt(0) === '0') {
   mob = mob.slice(1);
  }
  if (!regexM.test(mob)) {
   return false;
  }

  return mob;
 },
 validate_email: function (email) {
  return email;
 },
};
module.exports = fun;
