﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace API.Extensions
{
    public static class EnumerableExtensions
    {
        private static readonly Regex Regex = new Regex(@"\d+", RegexOptions.Compiled, TimeSpan.FromMilliseconds(500));

        /// <summary>
        /// A natural sort implementation
        /// </summary>
        /// <param name="items">IEnumerable to process</param>
        /// <param name="selector">Function that produces a string. Does not support null values</param>
        /// <param name="stringComparer">Defaults to CurrentCulture</param>
        /// <typeparam name="T"></typeparam>
        /// <returns>Sorted Enumerable</returns>
        public static IEnumerable<T> OrderByNatural<T>(this IEnumerable<T> items, Func<T, string> selector, StringComparer stringComparer = null)
        {
            var maxDigits = items
                .SelectMany(i => Regex.Matches(selector(i))
                    .Select(digitChunk => (int?)digitChunk.Value.Length))
                .Max() ?? 0;

            return items.OrderBy(i => Regex.Replace(selector(i), match => match.Value.PadLeft(maxDigits, '0')), stringComparer ?? StringComparer.CurrentCulture);
        }
    }
}
